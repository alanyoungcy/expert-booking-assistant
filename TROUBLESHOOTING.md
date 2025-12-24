# Troubleshooting GitHub Pages "File not found" Error

## Quick Checks

### 1. Verify GitHub Actions Workflow Ran Successfully

1. Go to: https://github.com/alanyoungcy/expert-booking-assistant/actions
2. Check if the "Deploy to GitHub Pages" workflow ran
3. Click on the latest run
4. Verify both `build` and `deploy` jobs completed successfully (green checkmarks)
5. If there are errors, check the logs

### 2. Verify GitHub Pages Configuration

1. Go to: https://github.com/alanyoungcy/expert-booking-assistant/settings/pages
2. **Source** should be set to: **GitHub Actions** (NOT "Deploy from a branch")
3. If it's set to "Deploy from a branch", change it to "GitHub Actions"

### 3. Check Build Output

In the GitHub Actions workflow logs, look for:
- "List dist contents" step - this will show what files were built
- Verify `index.html` exists in the dist folder
- Check that the base path is set correctly

### 4. Common Issues and Fixes

#### Issue: Workflow not running
**Solution:** 
- Make sure you've pushed to the `main` branch
- Check that `.github/workflows/deploy.yml` exists in your repository
- Verify the file is committed and pushed

#### Issue: Build failing
**Solution:**
- Check the build logs in GitHub Actions
- Common causes:
  - Missing dependencies (run `npm ci` locally to test)
  - TypeScript errors
  - Missing environment variables (if required)

#### Issue: "File not found" after successful deployment
**Solution:**
- Wait 1-2 minutes after deployment completes
- Clear your browser cache
- Try accessing: https://alanyoungcy.github.io/expert-booking-assistant/
- Check the browser console for 404 errors on specific files

#### Issue: Base path incorrect
**Solution:**
- The base path should be `/expert-booking-assistant/` (with trailing slash)
- Verify in `vite.config.ts` that `base` is set correctly
- Check the built `index.html` to see if assets are using the correct path

### 5. Manual Verification Steps

1. **Check the repository structure:**
   ```bash
   # Verify workflow file exists
   ls -la .github/workflows/deploy.yml
   ```

2. **Test build locally:**
   ```bash
   GITHUB_PAGES=true npm run build
   ls -la dist/
   cat dist/index.html | grep -i base
   ```

3. **Verify the built HTML has correct base path:**
   - Open `dist/index.html` after building
   - Check that script and link tags use `/expert-booking-assistant/` prefix

### 6. Force Re-deployment

If the deployment seems stuck:

1. Go to: https://github.com/alanyoungcy/expert-booking-assistant/actions
2. Click on "Deploy to GitHub Pages" workflow
3. Click "Run workflow" → "Run workflow" (manual trigger)
4. Wait for it to complete

### 7. Check Repository Settings

1. Go to: https://github.com/alanyoungcy/expert-booking-assistant/settings
2. Scroll to "Pages" section
3. Verify:
   - Source: **GitHub Actions**
   - Custom domain: (leave empty unless you have one)

### 8. Verify URL Structure

The correct URLs should be:
- Repository: `https://github.com/alanyoungcy/expert-booking-assistant`
- Live site: `https://alanyoungcy.github.io/expert-booking-assistant/`
- Note the trailing slash in the live site URL

### 9. Check Browser Console

Open the browser developer tools (F12) and check:
- Console tab for JavaScript errors
- Network tab for failed requests (404 errors)
- Verify that assets are loading from `/expert-booking-assistant/` path

### 10. Still Not Working?

If none of the above works:

1. **Check if the repository is public:**
   - GitHub Pages only works for public repositories (free tier)
   - Or upgrade to GitHub Pro for private repos

2. **Verify the repository name matches:**
   - Repository name must be exactly: `expert-booking-assistant`
   - The base path in `vite.config.ts` must match

3. **Check GitHub Actions permissions:**
   - Go to: Settings → Actions → General
   - Under "Workflow permissions", select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"

4. **Contact Support:**
   - Check GitHub Status: https://www.githubstatus.com/
   - Review GitHub Pages documentation: https://docs.github.com/en/pages

## Expected Workflow Output

When everything works correctly, you should see:

```
✅ build job: All steps completed
  - Checkout ✓
  - Setup Node.js ✓
  - Install dependencies ✓
  - Build ✓
  - Setup Pages ✓
  - Upload artifact ✓
  - List dist contents ✓

✅ deploy job: All steps completed
  - Deploy to GitHub Pages ✓
```

The deployment URL will be shown in the deploy job output.

