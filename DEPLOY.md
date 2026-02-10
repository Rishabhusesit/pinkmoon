# 🚀 Cloud Deployment Guide

## Option 1: Vercel (Recommended - Easiest & Fastest)

Vercel is the easiest way to deploy Next.js applications. It's free and takes just a few minutes!

### Quick Deploy:

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No**
   - Project name? (Press Enter for default or enter custom name)
   - Directory? (Press Enter for `./`)
   - Override settings? **No**

4. **For production deployment**:
   ```bash
   vercel --prod
   ```

### Deploy via GitHub (Even Easier):

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com)** and:
   - Sign up/Login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Add Custom Domain** (Optional):
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Environment Variables (if needed):
- Go to Project Settings → Environment Variables
- Add any required variables

---

## Option 2: AWS Amplify (Good for AWS Integration)

### Deploy via AWS Amplify Console:

1. **Push code to GitHub** (same as above)

2. **Go to AWS Amplify Console**:
   - Login to AWS Console
   - Navigate to AWS Amplify
   - Click "New app" → "Host web app"
   - Connect your GitHub repository
   - Select your repository and branch

3. **Configure Build Settings**:
   - Build command: `npm run build`
   - Output directory: `.next`
   - Base directory: `/` (or leave empty)

4. **Add Custom Domain**:
   - Go to App Settings → Domain Management
   - Add your custom domain
   - Configure Route 53 or external DNS

---

## Option 3: AWS Elastic Beanstalk (More Control)

### Prerequisites:
- AWS CLI installed and configured
- EB CLI installed: `pip install awsebcli`

### Deploy Steps:

1. **Initialize EB**:
   ```bash
   eb init -p docker pinkmoon-app
   ```

2. **Create environment**:
   ```bash
   eb create pinkmoon-env
   ```

3. **Deploy**:
   ```bash
   eb deploy
   ```

4. **Open in browser**:
   ```bash
   eb open
   ```

---

## Option 4: Docker + AWS ECS / Any Cloud

### Build Docker Image:

```bash
docker build -t pinkmoon .
```

### Run Locally (Test):
```bash
docker run -p 3000:3000 pinkmoon
```

### Push to Container Registry:

**For AWS ECR:**
```bash
aws ecr create-repository --repository-name pinkmoon
docker tag pinkmoon:latest <account-id>.dkr.ecr.<region>.amazonaws.com/pinkmoon:latest
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/pinkmoon:latest
```

Then create ECS task definition and service in AWS Console.

---

## 📝 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] All music files are in `public/music/`:
  - `Kya Mujhe Pyaar Hai-(Mr-Jat.in).mp3`
  - `cute-theme.mp3`
  - `japanese-theme.mp3`

- [ ] All images are in `public/images/`:
  - `image1.jpg`, `image2.jpg`, `image3.jpg`, `image4.jpg`
  - `Koi Pond In A Leaf.gif`

- [ ] Test locally: `npm run build` and `npm start`

- [ ] Code is committed to Git

---

## 🎯 Recommended: Vercel

**Why Vercel?**
- ✅ Built specifically for Next.js
- ✅ Zero configuration needed
- ✅ Free tier is generous
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Instant deployments
- ✅ Easy custom domains
- ✅ Preview deployments for every PR

**Deploy time: ~2 minutes**

---

## 🔧 After Deployment

1. **Test all pages**:
   - Main page
   - Camera page (needs HTTPS for camera access)
   - Gift page
   - Secrets page
   - Hangout page

2. **Add Custom Domain** (if desired):
   - Follow your platform's domain setup guide
   - Update DNS records
   - SSL certificate is usually automatic

3. **Monitor Performance**:
   - Check Vercel/AWS dashboard
   - Monitor analytics
   - Check error logs if any issues

---

## 🆘 Troubleshooting

**Build fails?**
- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible (18+)
- Check build logs for specific errors

**Music/images not loading?**
- Verify files are in `public/` directory
- Check file names match exactly (case-sensitive)
- Clear browser cache

**Camera not working?**
- Requires HTTPS (automatic on Vercel/AWS)
- User must grant camera permissions
- Test on actual device, not just localhost

---

**Ready to deploy? Start with Vercel - it's the fastest! 🚀**
