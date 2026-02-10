#!/bin/bash

# AWS Deployment Script for Pink Moon
# Full-fledged AWS deployment

set -e

echo "🎀 Pink Moon - AWS Deployment Script"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed.${NC}"
    echo "Install it from: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials not configured.${NC}"
    echo "Run: aws configure"
    exit 1
fi

echo -e "${GREEN}✓ AWS CLI found${NC}"
echo -e "${GREEN}✓ AWS credentials configured${NC}"
echo ""

# Get AWS account info
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
AWS_REGION=$(aws configure get region || echo "us-east-1")

echo "AWS Account ID: $AWS_ACCOUNT_ID"
echo "AWS Region: $AWS_REGION"
echo ""

# Menu for deployment options
echo "Select deployment method:"
echo "1) AWS Amplify (Easiest - Recommended)"
echo "2) AWS Elastic Beanstalk (Docker)"
echo "3) AWS ECS (Elastic Container Service)"
echo "4) Build and prepare for manual deployment"
echo ""
read -p "Enter choice [1-4]: " choice

case $choice in
    1)
        echo ""
        echo -e "${YELLOW}📦 Building application...${NC}"
        npm run build
        
        echo ""
        echo -e "${GREEN}✅ Build complete!${NC}"
        echo ""
        echo "Next steps for AWS Amplify:"
        echo "1. Go to AWS Amplify Console: https://console.aws.amazon.com/amplify"
        echo "2. Click 'New app' → 'Host web app'"
        echo "3. Connect your GitHub repository"
        echo "4. Build settings are auto-detected (or use amplify.yml)"
        echo "5. Click 'Save and deploy'"
        ;;
    
    2)
        echo ""
        echo -e "${YELLOW}📦 Preparing for Elastic Beanstalk...${NC}"
        
        # Check if EB CLI is installed
        if ! command -v eb &> /dev/null; then
            echo -e "${YELLOW}EB CLI not found. Installing...${NC}"
            pip3 install awsebcli
        fi
        
        # Initialize EB if not already done
        if [ ! -f ".elasticbeanstalk/config.yml" ]; then
            echo "Initializing Elastic Beanstalk..."
            eb init -p docker pinkmoon-app --region $AWS_REGION
        fi
        
        echo ""
        echo -e "${YELLOW}📦 Building Docker image...${NC}"
        docker build -t pinkmoon:latest .
        
        echo ""
        echo "Creating/updating Elastic Beanstalk environment..."
        echo "Run: eb create pinkmoon-env"
        echo "Or if environment exists: eb deploy"
        ;;
    
    3)
        echo ""
        echo -e "${YELLOW}📦 Preparing for ECS deployment...${NC}"
        
        # Build Docker image
        echo "Building Docker image..."
        docker build -t pinkmoon:latest .
        
        # Create ECR repository
        ECR_REPO_NAME="pinkmoon"
        echo "Creating ECR repository: $ECR_REPO_NAME"
        
        aws ecr describe-repositories --repository-names $ECR_REPO_NAME --region $AWS_REGION &> /dev/null || \
        aws ecr create-repository --repository-name $ECR_REPO_NAME --region $AWS_REGION
        
        ECR_URI="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_NAME"
        
        echo ""
        echo "Tagging and pushing to ECR..."
        docker tag pinkmoon:latest $ECR_URI:latest
        
        # Login to ECR
        aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_URI
        
        # Push to ECR
        docker push $ECR_URI:latest
        
        echo ""
        echo -e "${GREEN}✅ Image pushed to ECR: $ECR_URI:latest${NC}"
        echo ""
        echo "Next steps:"
        echo "1. Create ECS cluster: aws ecs create-cluster --cluster-name pinkmoon-cluster"
        echo "2. Create task definition (see aws-config/ecs-task-definition.json)"
        echo "3. Create service or run task"
        echo "4. Set up Application Load Balancer"
        ;;
    
    4)
        echo ""
        echo -e "${YELLOW}📦 Building application...${NC}"
        npm run build
        
        echo ""
        echo -e "${YELLOW}📦 Creating deployment package...${NC}"
        zip -r pinkmoon-deploy.zip . -x "node_modules/*" ".git/*" "*.git" ".next/cache/*" "*.log" ".DS_Store"
        
        echo ""
        echo -e "${GREEN}✅ Deployment package created: pinkmoon-deploy.zip${NC}"
        echo ""
        echo "You can now upload this to:"
        echo "- AWS Elastic Beanstalk"
        echo "- AWS EC2 (with manual setup)"
        echo "- Any other hosting service"
        ;;
    
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✅ Deployment preparation complete!${NC}"
