#!/bin/bash

# Simple S3 + CloudFront Deployment Script
# This is more reliable than Amplify for static sites

set -e

echo "🚀 Deploying Pink Moon to AWS S3 + CloudFront"
echo "=============================================="
echo ""

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not installed. Install from: https://aws.amazon.com/cli/"
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Run: aws configure"
    exit 1
fi

echo "✅ AWS CLI configured"
echo ""

# Build the app
echo "📦 Building application..."
cd web
npm ci
npm run build
cd ..

# Get AWS account info
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
AWS_REGION=$(aws configure get region || echo "us-east-1")
BUCKET_NAME="pinkmoon-app-${AWS_ACCOUNT_ID}"

echo "AWS Account: $AWS_ACCOUNT_ID"
echo "AWS Region: $AWS_REGION"
echo "Bucket Name: $BUCKET_NAME"
echo ""

# Create S3 bucket if it doesn't exist
echo "📦 Creating S3 bucket..."
if ! aws s3 ls "s3://${BUCKET_NAME}" 2>&1 | grep -q 'NoSuchBucket'; then
    aws s3 mb "s3://${BUCKET_NAME}" --region "$AWS_REGION"
    echo "✅ Bucket created"
else
    echo "✅ Bucket already exists"
fi

# Enable static website hosting
echo "🌐 Configuring static website hosting..."
aws s3 website "s3://${BUCKET_NAME}" \
    --index-document index.html \
    --error-document index.html

# Set bucket policy for public read
echo "🔓 Setting bucket policy..."
cat > /tmp/bucket-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${BUCKET_NAME}/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy file:///tmp/bucket-policy.json
rm /tmp/bucket-policy.json

# Upload files
echo "📤 Uploading files to S3..."
aws s3 sync web/dist/ "s3://${BUCKET_NAME}/" --delete

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your website is available at:"
echo "   http://${BUCKET_NAME}.s3-website-${AWS_REGION}.amazonaws.com"
echo ""
echo "📝 Next steps for HTTPS (CloudFront):"
echo "   1. Go to: https://console.aws.amazon.com/cloudfront"
echo "   2. Create distribution"
echo "   3. Origin: ${BUCKET_NAME}.s3-website-${AWS_REGION}.amazonaws.com"
echo "   4. Default root object: index.html"
echo "   5. Create distribution (takes 10-15 minutes)"
echo ""
