# 🚀 AWS Deployment Guide - Full-Fledged Application

Complete guide for deploying Pink Moon to AWS infrastructure.

## Prerequisites

1. **AWS Account** - Sign up at [aws.amazon.com](https://aws.amazon.com)
2. **AWS CLI** - Install from [aws.amazon.com/cli](https://aws.amazon.com/cli)
3. **AWS Credentials** - Configure with `aws configure`
4. **Docker** - For containerized deployments (ECS/EB)

---

## Option 1: AWS Amplify (Easiest - Recommended for Start)

### Quick Deploy:

1. **Push code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy via AWS Console**:
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
   - Click "New app" → "Host web app"
   - Connect GitHub repository
   - Select your repo and branch
   - Build settings are auto-detected (uses `amplify.yml`)
   - Click "Save and deploy"

3. **Add Custom Domain**:
   - Go to App Settings → Domain Management
   - Add your domain
   - Configure Route 53 or external DNS

**Deploy time: ~5-10 minutes**

---

## Option 2: AWS Elastic Beanstalk (Docker)

### Setup:

1. **Install EB CLI**:
   ```bash
   pip3 install awsebcli
   ```

2. **Initialize Elastic Beanstalk**:
   ```bash
   eb init -p docker pinkmoon-app
   ```
   - Select your region
   - Select or create application name

3. **Create Environment**:
   ```bash
   eb create pinkmoon-env
   ```
   - This creates EC2 instance, load balancer, and deploys your app
   - Takes ~5-10 minutes

4. **Deploy Updates**:
   ```bash
   eb deploy
   ```

5. **Open in Browser**:
   ```bash
   eb open
   ```

6. **View Logs**:
   ```bash
   eb logs
   ```

### Custom Domain:
- Go to Elastic Beanstalk Console
- Configuration → Load Balancer
- Add listener for HTTPS (port 443)
- Configure SSL certificate from ACM
- Update Route 53 to point to load balancer

---

## Option 3: AWS ECS (Elastic Container Service) - Production Grade

### Step 1: Build and Push Docker Image to ECR

```bash
# Build image
docker build -t pinkmoon:latest .

# Create ECR repository
aws ecr create-repository --repository-name pinkmoon --region us-east-1

# Get login token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Tag image
docker tag pinkmoon:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/pinkmoon:latest

# Push image
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/pinkmoon:latest
```

### Step 2: Create ECS Cluster

```bash
aws ecs create-cluster --cluster-name pinkmoon-cluster --region us-east-1
```

### Step 3: Create Task Definition

1. Go to ECS Console → Task Definitions → Create new
2. Use the template from `aws-config/ecs-task-definition.json`
3. Update image URI with your ECR image
4. Configure CPU/Memory (512 CPU, 1024 MB recommended)
5. Create task definition

Or use CLI:
```bash
aws ecs register-task-definition --cli-input-json file://aws-config/ecs-task-definition.json
```

### Step 4: Set Up Application Load Balancer

```bash
# Run the ALB setup script
./aws-config/alb-setup.sh
```

Or manually:
1. EC2 Console → Load Balancers → Create
2. Choose Application Load Balancer
3. Configure listeners (HTTP 80, HTTPS 443)
4. Create target group (port 3000)
5. Register ECS service with target group

### Step 5: Create ECS Service

```bash
aws ecs create-service \
  --cluster pinkmoon-cluster \
  --service-name pinkmoon-service \
  --task-definition pinkmoon-task \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}" \
  --load-balancers "targetGroupArn=<target-group-arn>,containerName=pinkmoon-container,containerPort=3000"
```

### Step 6: Configure Auto Scaling (Optional)

```bash
aws application-autoscaling register-scalable-target \
  --service-namespace ecs \
  --resource-id service/pinkmoon-cluster/pinkmoon-service \
  --scalable-dimension ecs:service:DesiredCount \
  --min-capacity 1 \
  --max-capacity 10
```

---

## Option 4: CloudFormation (Infrastructure as Code)

### Deploy Full Stack:

```bash
# Create S3 bucket for CloudFormation templates
aws s3 mb s3://pinkmoon-cf-templates

# Upload template
aws s3 cp aws-config/cloudformation-full.yaml s3://pinkmoon-cf-templates/

# Deploy stack
aws cloudformation create-stack \
  --stack-name pinkmoon-infrastructure \
  --template-url https://s3.amazonaws.com/pinkmoon-cf-templates/cloudformation-full.yaml \
  --parameters ParameterKey=DomainName,ParameterValue=yourdomain.com \
               ParameterKey=CertificateArn,ParameterValue=arn:aws:acm:...
  --capabilities CAPABILITY_IAM
```

### Update Stack:

```bash
aws cloudformation update-stack \
  --stack-name pinkmoon-infrastructure \
  --template-url https://s3.amazonaws.com/pinkmoon-cf-templates/cloudformation-full.yaml
```

---

## Automated Deployment Script

Use the provided script for easier deployment:

```bash
./aws-deploy.sh
```

This script provides:
- AWS Amplify setup
- Elastic Beanstalk preparation
- ECS image build and push
- Deployment package creation

---

## Custom Domain Setup

### 1. Get SSL Certificate (ACM)

```bash
# Request certificate
aws acm request-certificate \
  --domain-name yourdomain.com \
  --subject-alternative-names www.yourdomain.com \
  --validation-method DNS \
  --region us-east-1
```

Validate via DNS records in Route 53.

### 2. Configure Route 53

```bash
# Create hosted zone
aws route53 create-hosted-zone --name yourdomain.com --caller-reference $(date +%s)

# Create A record pointing to your ALB/CloudFront
aws route53 change-resource-record-sets \
  --hosted-zone-id <zone-id> \
  --change-batch file://route53-changes.json
```

### 3. Update DNS Nameservers

Update your domain registrar with Route 53 nameservers.

---

## Monitoring & Logging

### CloudWatch Logs

ECS automatically sends logs to CloudWatch. View in:
- CloudWatch Console → Log groups → `/ecs/pinkmoon`

### Application Monitoring

- **CloudWatch Metrics**: CPU, Memory, Request count
- **X-Ray**: Distributed tracing (optional)
- **Application Insights**: Auto-detect issues

### Set Up Alarms

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name pinkmoon-high-cpu \
  --alarm-description "Alert when CPU > 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/ECS \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold
```

---

## Cost Optimization

### Estimated Monthly Costs:

- **AWS Amplify**: ~$15-50/month (depending on traffic)
- **Elastic Beanstalk**: ~$30-100/month (t2.micro EC2 + ALB)
- **ECS Fargate**: ~$40-150/month (0.5 vCPU, 1GB RAM)
- **CloudFront**: ~$5-20/month (first 10TB free)

### Cost Saving Tips:

1. Use **Reserved Instances** for EC2 (save up to 75%)
2. Enable **Auto Scaling** to scale down during low traffic
3. Use **S3 + CloudFront** for static assets
4. Enable **CloudWatch Logs retention** (delete old logs)
5. Use **Spot Instances** for non-critical workloads

---

## Security Best Practices

1. **Enable HTTPS**: Always use SSL/TLS
2. **Security Groups**: Restrict access to necessary ports only
3. **IAM Roles**: Use least privilege principle
4. **Secrets Management**: Use AWS Secrets Manager for sensitive data
5. **WAF**: Enable Web Application Firewall for ALB
6. **Backup**: Regular backups of databases/configs

---

## Troubleshooting

### Build Fails:
- Check CloudWatch logs
- Verify Node.js version compatibility
- Check environment variables

### Application Not Loading:
- Check security groups (ports 80, 443, 3000)
- Verify target group health checks
- Check ECS service status

### High Costs:
- Review CloudWatch metrics
- Check for unused resources
- Enable auto-scaling down

### Domain Not Working:
- Verify DNS propagation (can take 24-48 hours)
- Check SSL certificate status
- Verify Route 53 records

---

## Quick Reference Commands

```bash
# View ECS service status
aws ecs describe-services --cluster pinkmoon-cluster --services pinkmoon-service

# View ALB target health
aws elbv2 describe-target-health --target-group-arn <arn>

# View CloudWatch logs
aws logs tail /ecs/pinkmoon --follow

# Scale ECS service
aws ecs update-service --cluster pinkmoon-cluster --service pinkmoon-service --desired-count 2

# Update ECS service with new image
aws ecs update-service --cluster pinkmoon-cluster --service pinkmoon-service --force-new-deployment
```

---

## Next Steps After Deployment

1. ✅ Test all pages (especially camera page - needs HTTPS)
2. ✅ Set up monitoring and alerts
3. ✅ Configure auto-scaling
4. ✅ Set up CI/CD pipeline (CodePipeline/GitHub Actions)
5. ✅ Enable CloudFront CDN for better performance
6. ✅ Set up backup and disaster recovery

---

**For detailed step-by-step help, run: `./aws-deploy.sh`**
