# 🚀 Deploy Pink Moon to AWS - Step by Step Guide

## Option 1: AWS Amplify (Recommended - Easiest)

AWS Amplify is the fastest way to deploy your Vite/React app. It connects directly to GitHub and auto-deploys on every push.

### Step 1: Prepare Your Repository
✅ Your code is already pushed to GitHub at: `https://github.com/Rishabhusesit/pinkmoon.git`

### Step 2: Deploy via AWS Console

1. **Go to AWS Amplify Console**
   - Visit: https://console.aws.amazon.com/amplify
   - Sign in to your AWS account (or create one at aws.amazon.com)

2. **Create New App**
   - Click **"New app"** → **"Host web app"**
   - Select **"GitHub"** as your source

3. **Authorize GitHub**
   - Click **"Authorize"** to connect your GitHub account
   - Grant permissions to access your repositories

4. **Select Repository**
   - Choose: `Rishabhusesit/pinkmoon`
   - Branch: `master`
   - Click **"Next"**

5. **Configure Build Settings**
   - AWS Amplify will auto-detect the build settings
   - **OR** use the `amplify.yml` file I've created in the `web/` directory
   - The build settings should be:
     ```yaml
     version: 1
     frontend:
       phases:
         preBuild:
           commands:
             - cd web
             - npm ci
         build:
           commands:
             - cd web
             - npm run build
       artifacts:
         baseDirectory: web/dist
         files:
           - '**/*'
     ```

6. **Review and Deploy**
   - Review the settings
   - Click **"Save and deploy"**

7. **Wait for Deployment**
   - AWS Amplify will:
     - Install dependencies
     - Build your app
     - Deploy to a live URL
   - This takes about 5-10 minutes

8. **Get Your Live URL**
   - Once deployed, you'll get a URL like: `https://main.xxxxx.amplifyapp.com`
   - Your app is now live! 🎉

### Step 3: Custom Domain (Optional)

1. In Amplify Console, go to **"Domain management"**
2. Click **"Add domain"**
3. Enter your domain name (e.g., `pinkmoon.com`)
4. Follow the DNS configuration instructions
5. AWS will automatically set up SSL/HTTPS

---

## Option 2: AWS S3 + CloudFront (More Control)

If you prefer more control over your deployment:

### Step 1: Build Your App
```bash
cd web
npm install
npm run build
```

### Step 2: Create S3 Bucket
```bash
aws s3 mb s3://pinkmoon-app --region us-east-1
```

### Step 3: Enable Static Website Hosting
```bash
aws s3 website s3://pinkmoon-app \
  --index-document index.html \
  --error-document index.html
```

### Step 4: Upload Build Files
```bash
cd web/dist
aws s3 sync . s3://pinkmoon-app --delete
```

### Step 5: Set Bucket Policy (Make it Public)
```bash
aws s3api put-bucket-policy --bucket pinkmoon-app --policy '{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::pinkmoon-app/*"
  }]
}'
```

### Step 6: Create CloudFront Distribution (For HTTPS & CDN)
1. Go to CloudFront Console: https://console.aws.amazon.com/cloudfront
2. Click **"Create distribution"**
3. Origin domain: Select your S3 bucket
4. Default root object: `index.html`
5. Click **"Create distribution"**
6. Wait 10-15 minutes for deployment
7. Use the CloudFront URL (HTTPS enabled)

---

## Option 3: Using AWS CLI (Automated)

I can create a deployment script for you. Would you like me to:
1. Create an automated deployment script?
2. Set up CI/CD with GitHub Actions?
3. Configure environment variables?

---

## Troubleshooting

### Build Fails
- Check the build logs in Amplify Console
- Ensure `web/package.json` has correct build script
- Verify all dependencies are in `package.json`

### Assets Not Loading
- Check that all media files are in `web/public/` directory
- Verify file paths in your code use `/` (absolute paths)
- Check browser console for 404 errors

### Routing Issues (404 on refresh)
- For S3: Configure error document to `index.html`
- For CloudFront: Add custom error response (403 → 200 → index.html)

---

## Next Steps After Deployment

1. **Monitor Performance**
   - Use AWS CloudWatch for monitoring
   - Set up alerts for errors

2. **Enable Analytics**
   - Add Google Analytics or AWS Pinpoint

3. **Optimize**
   - Enable CloudFront caching
   - Optimize images
   - Enable compression

4. **Security**
   - Enable AWS WAF (Web Application Firewall)
   - Set up rate limiting

---

## Quick Commands Reference

```bash
# Build locally
cd web && npm run build

# Test build locally
cd web && npm run preview

# Deploy to S3
aws s3 sync web/dist s3://pinkmoon-app --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

---

**Need help?** Let me know which option you'd like to use, and I'll guide you through it step by step!
