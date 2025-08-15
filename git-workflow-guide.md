# Git Branching Workflow for EduTrack

## Overview
This guide outlines the branching strategy for the EduTrack project to ensure safe development practices and maintain code quality.

## Branch Structure

### Main Branches
- **`main`** - Production-ready code, always stable
- **`develop`** - Integration branch for features, staging environment

### Feature Branches
- **`feature/feature-name`** - New features or enhancements
- **`bugfix/issue-description`** - Bug fixes
- **`hotfix/critical-fix`** - Urgent production fixes

## Workflow Steps

### 1. Starting New Work

```bash
# Make sure you're on the latest main/develop
git checkout main
git pull origin main

# Create and switch to a new feature branch
git checkout -b feature/email-verification-improvements

# Or for bug fixes
git checkout -b bugfix/sendgrid-delay-issue
```

### 2. During Development

```bash
# Make your changes
# Edit files, test functionality

# Stage specific files
git add src/components/auth/
git add server/email.ts

# Or stage all changes
git add .

# Commit with descriptive messages
git commit -m "feat: improve email verification page styling

- Add EduTrack branding to verification page
- Implement redirect from API to frontend page
- Enhance success/error state handling"
```

### 3. Commit Message Format

Use conventional commits format:

```
type(scope): description

- Detailed explanation of changes
- List key modifications
- Mention any breaking changes
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code formatting (no logic changes)
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### 4. Before Merging

```bash
# Push your branch to remote
git push origin feature/email-verification-improvements

# Update from main to avoid conflicts
git checkout main
git pull origin main
git checkout feature/email-verification-improvements
git rebase main

# Or merge main into your branch
git merge main
```

### 5. Creating Pull Request

1. Push your branch to the repository
2. Create a Pull Request from your branch to `main` or `develop`
3. Add descriptive title and details about changes
4. Request review from team members
5. Address any feedback before merging

## Replit-Specific Git Commands

### Initial Setup
```bash
# Initialize Git if not already done
git init

# Add remote repository
git remote add origin https://github.com/username/edutrack.git

# Create initial commit
git add .
git commit -m "Initial commit: EduTrack foundation"
git push -u origin main
```

### Working in Replit Console
```bash
# Check current branch and status
git status
git branch

# View commit history
git log --oneline

# See what changed
git diff
git diff --staged
```

### Branch Management
```bash
# List all branches
git branch -a

# Switch between branches
git checkout branch-name

# Create and switch to new branch
git checkout -b new-branch-name

# Delete local branch (after merging)
git branch -d feature/completed-feature

# Delete remote branch
git push origin --delete feature/completed-feature
```

## Best Practices

### 1. Branch Naming Conventions
- Use lowercase with hyphens: `feature/user-authentication`
- Be descriptive: `bugfix/email-delivery-delay`
- Include issue numbers: `feature/gh-123-lesson-generator`

### 2. Commit Guidelines
- **Atomic commits**: Each commit should represent one logical change
- **Descriptive messages**: Explain what and why, not just what
- **Regular commits**: Don't wait too long between commits
- **Test before committing**: Ensure code works and tests pass

### 3. Code Review Process
- **Self-review**: Check your own changes before requesting review
- **Small PRs**: Keep pull requests focused and manageable
- **Documentation**: Update docs when needed
- **Tests**: Include tests for new features

### 4. Merge Strategies
- **Squash merge**: For feature branches to keep history clean
- **Merge commit**: For important milestones
- **Rebase**: To maintain linear history

## Example Workflow

### Scenario: Adding SendGrid Email Templates

```bash
# 1. Start from main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/sendgrid-email-templates

# 3. Make changes
# - Edit server/email.ts
# - Add new email templates
# - Update tests

# 4. Commit changes
git add server/email.ts
git add tests/email.test.ts
git commit -m "feat: add professional email templates for SendGrid

- Create welcome email with EduTrack branding
- Add password reset email template
- Improve error handling in email service
- Add email template tests"

# 5. Push branch
git push origin feature/sendgrid-email-templates

# 6. Create Pull Request
# (Done through GitHub/GitLab interface)

# 7. After approval, merge and cleanup
git checkout main
git pull origin main
git branch -d feature/sendgrid-email-templates
```

## Troubleshooting

### Merge Conflicts
```bash
# When conflicts occur during merge/rebase
git status  # See conflicted files
# Edit files to resolve conflicts
git add resolved-file.ts
git commit  # Or git rebase --continue
```

### Undoing Changes
```bash
# Undo last commit (keep changes)
git reset HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Discard working directory changes
git checkout -- filename.ts
git checkout .  # All files
```

### Stashing Work
```bash
# Save work in progress
git stash

# Switch branches, then return
git checkout other-branch
git checkout feature-branch

# Restore stashed work
git stash pop
```

## Integration with Replit

### Replit Git Interface
- Use the built-in Git panel in Replit
- Visual diff viewer for changes
- Easy branch switching through UI
- Integrated commit and push operations

### Environment Variables
- Keep sensitive data in Replit Secrets
- Never commit API keys or passwords
- Use `.gitignore` for environment files

### Deployment
- `main` branch auto-deploys to production
- `develop` branch deploys to staging
- Feature branches can be tested in development

## Team Collaboration

### Branch Protection Rules
- Require pull request reviews
- Require status checks to pass
- Restrict direct pushes to main
- Require branches to be up to date

### Communication
- Use descriptive PR titles and descriptions
- Reference issue numbers in commits
- Comment on code for clarification
- Update project documentation when needed

---

*This workflow ensures code quality, enables collaboration, and maintains a clean project history for the EduTrack platform.*