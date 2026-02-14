#!/bin/bash

# Script to help fix AWS Amplify build configuration
# Run this after updating amplify.yml

echo "🔧 AWS Amplify Build Configuration Fix"
echo "======================================"
echo ""

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI not configured. Please run: aws configure"
    exit 1
fi

echo "✅ AWS CLI configured"
echo ""

# Get Amplify apps
echo "📋 Your AWS Amplify Apps:"
aws amplify list-apps --query 'apps[*].[name,appId]' --output table 2>/dev/null || {
    echo "⚠️  Could not list apps. Please check AWS credentials."
    echo ""
    echo "Manual steps to fix in AWS Console:"
    echo "1. Go to: https://console.aws.amazon.com/amplify"
    echo "2. Select your app"
    echo "3. Go to: App settings → Build settings"
    echo "4. Click 'Edit'"
    echo "5. Set these values:"
    echo "   - App root: / (or leave empty)"
    echo "   - Build command: cd web && npm ci && npm run build"
    echo "   - Output directory: web/dist"
    echo "6. OR use 'amplify.yml' from repository"
    echo "7. Save and redeploy"
    exit 0
}

echo ""
echo "To update build settings via AWS Console:"
echo "1. Go to: https://console.aws.amazon.com/amplify"
echo "2. Select your app"
echo "3. App settings → Build settings → Edit"
echo "4. Make sure 'amplify.yml' is selected OR set:"
echo "   - App root: /"
echo "   - Build command: cd web && npm ci && npm run build"
echo "   - Output directory: web/dist"
echo "5. Save and redeploy"
