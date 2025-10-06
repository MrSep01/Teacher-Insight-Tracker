import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as LocalStrategy } from "passport-local";

// Type declarations for packages without types
declare module 'passport-microsoft' {
  export const Strategy: any;
}
declare module 'passport-apple' {
  export const Strategy: any;
}

import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import { Strategy as AppleStrategy } from "passport-apple";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { storage } from "./storage";
import { emailService } from "./email";
import { insertUserSchema } from "@shared/schema";

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "user_sessions",
  });
  
  return session({
    secret: process.env.SESSION_SECRET || "your-session-secret-key-here",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: sessionTtl,
    },
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  // Google OAuth Strategy
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback"
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await storage.getUserByEmail(profile.emails?.[0]?.value || "");
        
        if (!user) {
          user = await storage.createUser({
            email: profile.emails?.[0]?.value || "",
            firstName: profile.name?.givenName || "",
            lastName: profile.name?.familyName || "",
            profileImageUrl: profile.photos?.[0]?.value || "",
            provider: "google",
            providerId: profile.id,
          });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }));
  }

  // Facebook OAuth Strategy
  if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
    passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ['id', 'emails', 'name', 'picture.type(large)']
    }, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      try {
        let user = await storage.getUserByEmail(profile.emails?.[0]?.value || "");
        
        if (!user) {
          user = await storage.createUser({
            email: profile.emails?.[0]?.value || "",
            firstName: profile.name?.givenName || "",
            lastName: profile.name?.familyName || "",
            profileImageUrl: profile.photos?.[0]?.value || "",
            provider: "facebook",
            providerId: profile.id,
          });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }));
  }

  // Microsoft OAuth Strategy
  if (process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_CLIENT_SECRET) {
    passport.use(new MicrosoftStrategy({
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: "/api/auth/microsoft/callback",
      scope: ['user.read']
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await storage.getUserByEmail(profile.emails?.[0]?.value || "");
        
        if (!user) {
          user = await storage.createUser({
            email: profile.emails?.[0]?.value || "",
            firstName: profile.name?.givenName || "",
            lastName: profile.name?.familyName || "",
            profileImageUrl: profile.photos?.[0]?.value || "",
            provider: "microsoft",
            providerId: profile.id,
          });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }));
  }

  // Apple OAuth Strategy (requires additional setup)
  if (process.env.APPLE_CLIENT_ID && process.env.APPLE_TEAM_ID && process.env.APPLE_KEY_ID && process.env.APPLE_PRIVATE_KEY) {
    passport.use(new AppleStrategy({
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      callbackURL: "/api/auth/apple/callback",
      keyID: process.env.APPLE_KEY_ID,
      privateKeyString: process.env.APPLE_PRIVATE_KEY,
      scope: ['name', 'email']
    }, async (accessToken, refreshToken, idToken, profile, done) => {
      try {
        let user = await storage.getUserByEmail(profile.email || "");
        
        if (!user) {
          user = await storage.createUser({
            email: profile.email || "",
            firstName: profile.name?.firstName || "",
            lastName: profile.name?.lastName || "",
            profileImageUrl: "",
            provider: "apple",
            providerId: profile.id,
          });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }));
  }

  // Email/Password Authentication Strategy
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await storage.getUserByEmail(email);
        
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        if (user.provider !== 'local' || !user.password) {
          return done(null, false, { message: 'Please use your social login method' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return done(null, false, { message: 'Invalid password' });
        }

        if (!user.emailVerified) {
          return done(null, false, { message: 'Please verify your email address' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));

  passport.serializeUser((user: any, cb) => cb(null, user.id));
  passport.deserializeUser(async (id: number, cb) => {
    try {
      const user = await storage.getUserById(id);
      cb(null, user);
    } catch (error) {
      cb(error, null);
    }
  });

  // Auth routes
  app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
  app.get("/api/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
    res.redirect("/");
  });

  app.get("/api/auth/microsoft", passport.authenticate("microsoft"));
  app.get("/api/auth/microsoft/callback", passport.authenticate("microsoft", { failureRedirect: "/login" }), (req, res) => {
    res.redirect("/");
  });

  app.get("/api/auth/apple", passport.authenticate("apple"));
  app.get("/api/auth/apple/callback", passport.authenticate("apple", { failureRedirect: "/login" }), (req, res) => {
    res.redirect("/");
  });

  app.get("/api/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));
  app.get("/api/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
    res.redirect("/");
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Email authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      
      // Validate input
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ error: "All fields are required" });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // Hash password and create verification token
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = crypto.randomBytes(32).toString('hex');

      // Create user
      const user = await storage.createUser({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        provider: 'local',
        emailVerificationToken: verificationToken,
        emailVerified: false,
      });

      // Send welcome email
      await emailService.sendWelcomeEmail(email, firstName, verificationToken);

      res.status(201).json({ 
        message: "Account created successfully! Please check your email to verify your account.",
        user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) {
        console.error("Authentication error:", err);
        return res.status(500).json({ error: "Login failed" });
      }
      if (!user) {
        return res.status(401).json({ error: info?.message || "Invalid credentials" });
      }
      
      req.logIn(user, (err) => {
        if (err) {
          console.error("Login error:", err);
          return res.status(500).json({ error: "Login failed" });
        }
        res.json({ 
          message: "Login successful", 
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImageUrl: user.profileImageUrl
          }
        });
      });
    })(req, res, next);
  });

  app.get("/api/auth/verify-email", async (req, res) => {
    try {
      const { token } = req.query;
      
      if (!token) {
        // Redirect to frontend verification page with error
        return res.redirect(`/verify-email?error=${encodeURIComponent("Verification token is required")}`);
      }

      const user = await storage.getUserByVerificationToken(token as string);
      if (!user) {
        // Redirect to frontend verification page with error
        return res.redirect(`/verify-email?error=${encodeURIComponent("Invalid or expired verification token")}`);
      }

      // Update user as verified
      await storage.updateUser(user.id, {
        emailVerified: true,
        emailVerificationToken: null,
      });

      // Redirect to frontend verification page with success
      res.redirect(`/verify-email?success=${encodeURIComponent("Email verified successfully! You can now log in.")}`);
    } catch (error) {
      console.error("Email verification error:", error);
      // Redirect to frontend verification page with error
      res.redirect(`/verify-email?error=${encodeURIComponent("Email verification failed. Please try again.")}`);
    }
  });

  app.post("/api/auth/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user || user.provider !== 'local') {
        // Don't reveal if user exists for security
        return res.json({ message: "If this email exists, you'll receive a password reset link." });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetExpires = new Date(Date.now() + 3600000); // 1 hour from now

      await storage.updateUser(user.id, {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetExpires,
      });

      // Send reset email
      await emailService.sendPasswordResetEmail(email, user.firstName || '', resetToken);

      res.json({ message: "If this email exists, you'll receive a password reset link." });
    } catch (error) {
      console.error("Password reset error:", error);
      res.status(500).json({ error: "Password reset failed" });
    }
  });

  app.post("/api/auth/reset-password", async (req, res) => {
    try {
      const { token, password } = req.body;
      
      if (!token || !password) {
        return res.status(400).json({ error: "Token and password are required" });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
      }

      const user = await storage.getUserByResetToken(token);
      if (!user) {
        return res.status(400).json({ error: "Invalid or expired reset token" });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update user
      await storage.updateUser(user.id, {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      });

      res.json({ message: "Password reset successful! You can now log in." });
    } catch (error) {
      console.error("Password reset error:", error);
      res.status(500).json({ error: "Password reset failed" });
    }
  });

  // Development helper endpoint to get verification token for testing
  app.get("/api/auth/dev-get-token", async (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      return res.status(404).json({ error: "Not found" });
    }

    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const user = await storage.getUserByEmail(email as string);
      if (!user || !user.emailVerificationToken) {
        return res.status(404).json({ error: "No pending verification found for this email" });
      }

      res.json({ token: user.emailVerificationToken });
    } catch (error) {
      console.error("Dev token retrieval error:", error);
      res.status(500).json({ error: "Failed to retrieve token" });
    }
  });

  app.get("/api/auth/user", async (req, res) => {
    if (req.isAuthenticated()) {
      const user = await storage.getUserById((req.user as any).id);
      res.json(user);
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  });

  app.post("/api/auth/setup-profile", requireAuth, async (req, res) => {
    try {
      const { curriculum, gradeLevels } = req.body;
      
      console.log("Profile setup request:", { curriculum, gradeLevels, userId: req.user.id });
      
      if (!curriculum || !gradeLevels || gradeLevels.length === 0) {
        return res.status(400).json({ error: "Curriculum and grade levels are required" });
      }

      // Validate curriculum value
      const validCurriculums = ["IGCSE Chemistry Edexcel", "A Level Chemistry Edexcel"];
      if (!validCurriculums.includes(curriculum)) {
        return res.status(400).json({ error: "Invalid curriculum value" });
      }

      const updatedUser = await storage.updateUser((req.user as any).id, {
        curricula: [curriculum],
        gradeLevels,
        profileCompleted: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "Profile setup completed successfully", user: updatedUser });
    } catch (error) {
      console.error("Profile setup error details:", error);
      // Send more specific error message to help debug
      const errorMessage = error instanceof Error ? error.message : "Profile setup failed";
      res.status(500).json({ error: errorMessage });
    }
  });
}

export const requireAuth: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Authentication required" });
};