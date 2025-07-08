import * as nodemailer from 'nodemailer';

// Simple email service using nodemailer with multiple provider support
class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.setupTransporter();
  }

  private setupTransporter() {
    // Try to set up email transporter with various providers
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Custom SMTP configuration
      this.transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // For development, use Ethereal Email (test email service)
      console.log('No SMTP configuration found. Using console logging for emails in development.');
      this.transporter = null;
    }
  }

  async sendWelcomeEmail(email: string, firstName: string, verificationToken: string) {
    const verificationUrl = `${process.env.BASE_URL || 'http://localhost:5000'}/verify-email?token=${verificationToken}`;
    
    const subject = 'Welcome to EduTrack - Verify Your Email';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to EduTrack!</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Your Teacher Dashboard for Student Success</p>
        </div>
        
        <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-top: 0;">Hi ${firstName || 'there'}!</h2>
          
          <p style="color: #666; line-height: 1.6;">
            Thank you for joining EduTrack! To get started, please verify your email address by clicking the button below:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: #667eea; color: white; padding: 14px 30px; text-decoration: none; 
                      border-radius: 6px; font-weight: bold; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h3 style="color: #333; margin-top: 0;">🚀 What You Can Do with EduTrack:</h3>
            <ul style="color: #666; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li><strong>Student Management:</strong> Track student progress and performance across all subjects</li>
              <li><strong>Assessment Tools:</strong> Create and manage assessments with automatic grading</li>
              <li><strong>AI Recommendations:</strong> Get personalized teaching suggestions powered by AI</li>
              <li><strong>Progress Analytics:</strong> View detailed reports and charts of student development</li>
              <li><strong>Lesson Planning:</strong> Access curriculum recommendations based on student needs</li>
            </ul>
          </div>
          
          <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;">
              <strong>💡 Pro Tip:</strong> After verifying your email, start by adding your students and creating your first assessment to see EduTrack in action!
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #888; font-size: 14px; margin-bottom: 0;">
            If you didn't create an account, please ignore this email.<br>
            If you have any questions, feel free to reach out to our support team.
          </p>
        </div>
      </div>
    `;

    return this.sendEmail(email, subject, html);
  }

  async sendPasswordResetEmail(email: string, firstName: string, resetToken: string) {
    const resetUrl = `${process.env.BASE_URL || 'http://localhost:5000'}/reset-password?token=${resetToken}`;
    
    const subject = 'EduTrack - Password Reset Request';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #dc3545; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Password Reset Request</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-top: 0;">Hi ${firstName || 'there'}!</h2>
          
          <p style="color: #666; line-height: 1.6;">
            We received a request to reset your password for your EduTrack account. Click the button below to reset it:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: #dc3545; color: white; padding: 14px 30px; text-decoration: none; 
                      border-radius: 6px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <p style="margin: 0; color: #666;">
              <strong>Security Note:</strong> This link will expire in 1 hour for your security.
              If you didn't request this reset, please ignore this email.
            </p>
          </div>
        </div>
      </div>
    `;

    return this.sendEmail(email, subject, html);
  }

  private async sendEmail(to: string, subject: string, html: string) {
    if (!this.transporter) {
      // For development, log email to console
      console.log('\n=== EMAIL SENT ===');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`HTML: ${html}`);
      console.log('==================\n');
      return true;
    }

    try {
      const info = await this.transporter.sendMail({
        from: process.env.FROM_EMAIL || 'noreply@edutrack.com',
        to,
        subject,
        html,
      });

      console.log('Email sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('Email send error:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();