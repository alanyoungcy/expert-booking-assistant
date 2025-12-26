# Enable GitHub Pages - Step by Step

## The Error
```
Error: Get Pages site failed. Please verify that the repository has Pages enabled 
and configured to build using GitHub Actions
```

This means GitHub Pages needs to be enabled in your repository settings.

## Solution: Enable GitHub Pages Manually (First Time)

### Step 1: Go to Repository Settings
1. Go to: https://github.com/alanyoungcy/expert-booking-assistant
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar

### Step 2: Configure Pages Source
1. Under **Source**, you should see a dropdown
2. Select **"GitHub Actions"** from the dropdown
3. **DO NOT** select "Deploy from a branch"
4. Click **Save** (if there's a save button)

### Step 3: Verify Configuration
You should see:
- ✅ Source: **GitHub Actions** (selected)
- ✅ The message: "Workflow details will appear here once your site has been deployed"

### Step 4: Push the Updated Workflow
After enabling Pages, push the updated workflow:

```bash
cd /Volumes/Orico/code/ncode/pestkiller/AI-pestkiller-booking-assistant2.0/expert-booking-system
git add .github/workflows/deploy.yml
git commit -m "Add enablement parameter to configure-pages action"
git push origin main
```

### Step 5: Trigger the Workflow
1. Go to: https://github.com/alanyoungcy/expert-booking-assistant/actions
2. Click on **"Deploy to GitHub Pages"** workflow
3. Click **"Run workflow"** → **"Run workflow"** (manual trigger)
4. Wait for it to complete

## Alternative: If "GitHub Actions" Option Doesn't Appear

If you don't see "GitHub Actions" as an option:

1. Make sure you have a workflow file at `.github/workflows/deploy.yml`
2. The workflow must be committed and pushed to the repository
3. Try refreshing the Settings → Pages page
4. If it still doesn't appear, try:
   - Temporarily select "Deploy from a branch" → select `main` → Save
   - Then change it back to "GitHub Actions" → Save

## Check Repository Permissions

Make sure the repository has the right permissions:

1. Go to: Settings → Actions → General
2. Under **"Workflow permissions"**:
   - Select **"Read and write permissions"**
   - Check **"Allow GitHub Actions to create and approve pull requests"**
3. Click **Save**

## After Enabling

Once Pages is enabled and the workflow runs successfully:
- Your site will be available at: https://alanyoungcy.github.io/expert-booking-assistant/
- It may take 1-2 minutes after the workflow completes

## Still Having Issues?

If you still get the error after enabling Pages:

1. **Check if the repository is public:**
   - GitHub Pages (free tier) only works with public repositories
   - Go to: Settings → scroll to bottom → Change visibility → Make public

2. **Verify the workflow file exists:**
   - Go to: https://github.com/alanyoungcy/expert-booking-assistant/tree/main/.github/workflows
   - You should see `deploy.yml` file

3. **Check Actions tab:**
   - Go to: https://github.com/alanyoungcy/expert-booking-assistant/actions
   - Make sure workflows are enabled (you might see a banner to enable them)


