#!/bin/bash

# Script to push expert-booking-assistant to GitHub
# Username: alanyoungcy

echo "🚀 Pushing expert-booking-assistant to GitHub..."

# Check if remote exists
if git remote get-url origin >/dev/null 2>&1; then
    echo "✅ Remote 'origin' already exists"
    git remote set-url origin https://github.com/alanyoungcy/expert-booking-assistant.git
else
    echo "➕ Adding remote 'origin'..."
    git remote add origin https://github.com/alanyoungcy/expert-booking-assistant.git
fi

# Verify remote
echo ""
echo "📍 Remote configuration:"
git remote -v

# Ensure we're on main branch
git branch -M main

# Show current status
echo ""
echo "📊 Current status:"
git status

echo ""
echo "📝 Next steps:"
echo "1. Make sure you've created the repository on GitHub:"
echo "   https://github.com/new"
echo "   Repository name: expert-booking-assistant"
echo "   (Don't initialize with README, .gitignore, or license)"
echo ""
echo "2. Then run:"
echo "   git push -u origin main"
echo ""
echo "3. After pushing, enable GitHub Pages:"
echo "   - Go to: https://github.com/alanyoungcy/expert-booking-assistant/settings/pages"
echo "   - Source: Select 'GitHub Actions'"
echo ""
echo "🌐 Your site will be available at:"
echo "   https://alanyoungcy.github.io/expert-booking-assistant/"

