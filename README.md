<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Expert Booking Assistant

A booking system for pest control and cleaning services.

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set environment variables in `.env.local`:
   ```
   VITE_N8N_WEBHOOK_URL=https://pestkiller.app.n8n.cloud/webhook-test/booking-assistant
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. Run the app:
   ```bash
   npm run dev
   ```

## Deploy to GitHub Pages

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Initial Setup

1. **Create a new repository on GitHub** named `expert-booking-assistant`

2. **Initialize git and push to GitHub:**
   ```bash
   # Initialize git repository
   git init
   git add .
   git commit -m "Initial commit: Expert Booking Assistant"
   
   # Add your GitHub repository as remote
   git remote add origin https://github.com/YOUR_USERNAME/expert-booking-assistant.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The site will be available at: `https://YOUR_USERNAME.github.io/expert-booking-assistant/`

### Automatic Deployment

After the initial setup, every push to the `main` branch will automatically:
- Build the project
- Deploy to GitHub Pages

The deployment workflow is configured in `.github/workflows/deploy.yml`.

### Environment Variables for GitHub Pages

For production deployment, you'll need to set environment variables in GitHub:
- Go to **Settings** → **Secrets and variables** → **Actions**
- Add repository secrets for any required environment variables

**Note:** Since GitHub Pages serves static files, environment variables prefixed with `VITE_` are embedded at build time. Make sure to set them in your GitHub Actions secrets if needed.
