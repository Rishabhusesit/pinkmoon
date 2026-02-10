#!/bin/bash

# Application Load Balancer Setup Script
# For ECS or EC2 deployment

set -e

echo "🎀 Setting up Application Load Balancer for Pink Moon"
echo "====================================================="

AWS_REGION=${AWS_REGION:-us-east-1}
VPC_ID=${VPC_ID:-""}
SUBNET_IDS=${SUBNET_IDS:-""}

if [ -z "$VPC_ID" ]; then
    echo "Getting default VPC..."
    VPC_ID=$(aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query "Vpcs[0].VpcId" --output text --region $AWS_REGION)
fi

if [ -z "$SUBNET_IDS" ]; then
    echo "Getting default subnets..."
    SUBNET_IDS=$(aws ec2 describe-subnets --filters "Name=vpc-id,Values=$VPC_ID" --query "Subnets[*].SubnetId" --output text --region $AWS_REGION | tr '\t' ',')
fi

echo "VPC ID: $VPC_ID"
echo "Subnet IDs: $SUBNET_IDS"
echo ""

# Create Security Group
echo "Creating security group..."
SG_ID=$(aws ec2 create-security-group \
    --group-name pinkmoon-alb-sg \
    --description "Security group for Pink Moon ALB" \
    --vpc-id $VPC_ID \
    --region $AWS_REGION \
    --query 'GroupId' \
    --output text)

echo "Security Group ID: $SG_ID"

# Allow HTTP and HTTPS
aws ec2 authorize-security-group-ingress \
    --group-id $SG_ID \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0 \
    --region $AWS_REGION

aws ec2 authorize-security-group-ingress \
    --group-id $SG_ID \
    --protocol tcp \
    --port 443 \
    --cidr 0.0.0.0/0 \
    --region $AWS_REGION

echo "✓ Security group configured"
echo ""

# Create Application Load Balancer
echo "Creating Application Load Balancer..."
ALB_ARN=$(aws elbv2 create-load-balancer \
    --name pinkmoon-alb \
    --subnets $(echo $SUBNET_IDS | tr ',' ' ') \
    --security-groups $SG_ID \
    --region $AWS_REGION \
    --query 'LoadBalancers[0].LoadBalancerArn' \
    --output text)

ALB_DNS=$(aws elbv2 describe-load-balancers \
    --load-balancer-arns $ALB_ARN \
    --region $AWS_REGION \
    --query 'LoadBalancers[0].DNSName' \
    --output text)

echo "✓ ALB created: $ALB_DNS"
echo "ALB ARN: $ALB_ARN"
echo ""

# Create Target Group
echo "Creating target group..."
TG_ARN=$(aws elbv2 create-target-group \
    --name pinkmoon-tg \
    --protocol HTTP \
    --port 3000 \
    --vpc-id $VPC_ID \
    --target-type ip \
    --health-check-path / \
    --health-check-interval-seconds 30 \
    --health-check-timeout-seconds 5 \
    --healthy-threshold-count 2 \
    --unhealthy-threshold-count 3 \
    --region $AWS_REGION \
    --query 'TargetGroups[0].TargetGroupArn' \
    --output text)

echo "✓ Target Group created: $TG_ARN"
echo ""

# Create Listener (HTTP)
echo "Creating HTTP listener..."
aws elbv2 create-listener \
    --load-balancer-arn $ALB_ARN \
    --protocol HTTP \
    --port 80 \
    --default-actions Type=forward,TargetGroupArn=$TG_ARN \
    --region $AWS_REGION

echo "✓ HTTP listener created"
echo ""

echo "=========================================="
echo "✅ Application Load Balancer setup complete!"
echo ""
echo "ALB DNS Name: $ALB_DNS"
echo "Target Group ARN: $TG_ARN"
echo ""
echo "Next steps:"
echo "1. Point your ECS service or EC2 instances to target group: $TG_ARN"
echo "2. (Optional) Add HTTPS listener with SSL certificate"
echo "3. Configure Route 53 to point to: $ALB_DNS"
