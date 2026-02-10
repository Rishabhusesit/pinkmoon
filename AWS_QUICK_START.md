# ⚡ AWS Quick Start - Deploy in 10 Minutes

## Fastest Path: AWS Amplify

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
# Create repo on GitHub, then:
git remote add origin <your-repo-url>
git push -u origin main
```

### Step 2: Deploy via AWS Console
1. Go to: https://console.aws.amazon.com/amplify
2. Click **"New app"** → **"Host web app"**
3. Connect GitHub
4. Select your repository
5. Click **"Save and deploy"**

**Done! Your app will be live in ~5-10 minutes.**

---

## Production Path: AWS ECS (Full Infrastructure)

### Step 1: Run Deployment Script
```bash
./aws-deploy.sh
# Select option 3 (ECS)
```

### Step 2: Manual Steps (if script doesn't complete)
```bash
# Build and push to ECR
docker build -t pinkmoon:latest .
aws ecr create-repository --repository-name pinkmoon
# Follow ECR login instructions from script output
docker push <ecr-uri>:latest

# Create ECS cluster
aws ecs create-cluster --cluster-name pinkmoon-cluster

# Set up ALB
./aws-config/alb-setup.sh

# Create ECS service (use ARNs from above)
aws ecs create-service --cluster pinkmoon-cluster ...
```

---

## What You Get

✅ **Full AWS Infrastructure**
- Application Load Balancer
- ECS Fargate containers
- Auto-scaling capability
- CloudWatch monitoring
- SSL/HTTPS support
- Custom domain ready

✅ **Production Ready**
- High availability
- Load balancing
- Health checks
- Logging & monitoring
- Security groups

---

## Next Steps

1. **Add Custom Domain**: See `AWS_DEPLOYMENT.md` section on Route 53
2. **Set Up Monitoring**: CloudWatch dashboards and alarms
3. **Configure Auto-Scaling**: Scale based on CPU/Memory
4. **Enable CDN**: CloudFront for global performance

---

**For detailed instructions, see `AWS_DEPLOYMENT.md`**
