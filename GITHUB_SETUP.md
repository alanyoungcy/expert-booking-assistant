# GitHub Setup Guide for Expert Booking Assistant

## ✅ What's Already Done

1. ✅ GitHub Pages configuration in `vite.config.ts`
2. ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)
3. ✅ Environment variable setup (`.env.local` with `VITE_N8N_WEBHOOK_URL`)
4. ✅ TypeScript definitions for environment variables
5. ✅ Updated README with your username (alanyoungcy)
6. ✅ Git repository initialized

## 🚀 Final Steps to Push to GitHub

### Step 1: Create Repository on GitHub

1. Go to: https://github.com/new
2. Repository name: `expert-booking-assistant`
3. Description: "Expert Booking Assistant for pest control and cleaning services"
4. **Important:** Do NOT initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### Step 2: Add Remote and Push

Run these commands in your terminal:

```bash
cd /Volumes/Orico/code/ncode/pestkiller/AI-pestkiller-booking-assistant2.0/expert-booking-system

# Add the new script to git
git add push-to-github.sh
git commit -m "Add GitHub push script"

# Set up remote (replace if exists)
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/alanyoungcy/expert-booking-assistant.git

# Verify remote
git remote -v

# Ensure we're on main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to: https://github.com/alanyoungcy/expert-booking-assistant/settings/pages
2. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
3. The GitHub Actions workflow will automatically deploy on every push to `main`

### Step 4: Verify Deployment

1. After pushing, go to the **Actions** tab in your repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Wait for it to complete (usually 1-2 minutes)
4. Your site will be available at: **https://alanyoungcy.github.io/expert-booking-assistant/**

## 📝 Environment Variables

For production builds, if you need to set environment variables:

1. Go to: https://github.com/alanyoungcy/expert-booking-assistant/settings/secrets/actions
2. Add repository secrets:
   - `VITE_N8N_WEBHOOK_URL` (if different from default)
   - `GEMINI_API_KEY` (if needed)

**Note:** The default webhook URL is already set in the code, so you may not need to add it as a secret unless you want to override it.

## 🔄 Automatic Deployment

After the initial setup, every time you push to the `main` branch:
- GitHub Actions will automatically build your project
- Deploy it to GitHub Pages
- Your site will update automatically

## 📁 Repository Structure

```
expert-booking-assistant/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── components/                  # React components
├── services/
│   └── api.ts                   # API service with configurable webhook URL
├── .env.local                   # Local environment variables (not committed)
├── vite.config.ts               # Vite config with GitHub Pages base path
├── vite-env.d.ts                # TypeScript definitions for env vars
└── README.md                    # Project documentation
```

## 🐛 Troubleshooting

### If push fails with authentication:
- Use GitHub CLI: `gh auth login`
- Or use SSH: `git remote set-url origin git@github.com:alanyoungcy/expert-booking-assistant.git`

### If GitHub Pages doesn't deploy:
- Check the Actions tab for errors
- Make sure "GitHub Actions" is selected as the source in Settings → Pages
- Verify the workflow file exists at `.github/workflows/deploy.yml`

### If the site shows 404:
- Wait a few minutes after the first deployment
- Check that the base path in `vite.config.ts` matches your repository name
- Verify the build completed successfully in the Actions tab

## 📞 Quick Reference

- **Repository:** https://github.com/alanyoungcy/expert-booking-assistant
- **Live Site:** https://alanyoungcy.github.io/expert-booking-assistant/
- **Webhook URL:** https://pestkiller.app.n8n.cloud/webhook-test/booking-assistant

