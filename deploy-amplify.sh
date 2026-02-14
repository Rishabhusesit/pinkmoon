#!/bin/bash

# Quick AWS Amplify Deployment Helper
# This script helps you deploy to AWS Amplify

echo "🎀 Pink Moon - AWS Amplify Deployment Helper"
echo "============================================"
echo ""

# Check if git is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes."
    read -p "Do you want to commit and push before deploying? (y/n): " commit_choice
    if [ "$commit_choice" = "y" ]; then
        git add -A
        git commit -m "Prepare for AWS deployment"
        git push origin master
        echo "✅ Changes pushed to GitHub"
    fi
fi

echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Go to AWS Amplify Console:"
echo "   https://console.aws.amazon.com/amplify"
echo ""
echo "2. Click 'New app' → 'Host web app'"
echo ""
echo "3. Connect your GitHub account"
echo ""
echo "4. Select repository: Rishabhusesit/pinkmoon"
echo "   Branch: master"
echo ""
echo "5. Build settings (auto-detected or use web/amplify.yml):"
echo "   - App root: /"
echo "   - Build command: cd web && npm ci && npm run build"
echo "   - Output directory: web/dist"
echo ""
echo "6. Click 'Save and deploy'"
echo ""
echo "⏳ Deployment will take 5-10 minutes"
echo ""
echo "✅ Once deployed, you'll get a live URL like:"
echo "   https://main.xxxxx.amplifyapp.com"
echo ""
echo "🎉 Your app will be live on the internet!"
