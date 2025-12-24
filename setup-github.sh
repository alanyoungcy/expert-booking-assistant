#!/bin/bash

# Setup script for GitHub Pages deployment
# This script initializes a new git repository and prepares it for GitHub

echo "🚀 Setting up expert-booking-assistant for GitHub Pages..."

# Check if .git already exists
if [ -d ".git" ]; then
    echo "⚠️  Git repository already exists. Removing it to start fresh..."
    rm -rf .git
fi

# Initialize git repository
echo "📦 Initializing git repository..."
git init

# Add all files
echo "➕ Adding files to git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Expert Booking Assistant"

# Set main branch
echo "🌿 Setting main branch..."
git branch -M main

echo ""
echo "✅ Git repository initialized successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Create a new repository on GitHub named 'expert-booking-assistant'"
echo "2. Run the following commands:"
echo ""
echo "   git remote add origin https://github.com/alanyoungcy/expert-booking-assistant.git"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages in repository settings:"
echo "   - Go to Settings → Pages"
echo "   - Select 'GitHub Actions' as the source"
echo ""
echo "🌐 Your site will be available at:"
echo "   https://alanyoungcy.github.io/expert-booking-assistant/"

