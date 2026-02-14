# 🔧 Fix AWS Amplify Build Configuration

## The Problem
The build is failing with: `cd: web: No such file or directory`

This happens because AWS Amplify console settings might be overriding the `amplify.yml` file.

## Solution: Update AWS Amplify Console Settings

### Step 1: Go to AWS Amplify Console
1. Visit: https://console.aws.amazon.com/amplify
2. Sign in to your AWS account
3. Click on your app (pinkmoon)

### Step 2: Update Build Settings
1. Click **"App settings"** in the left sidebar
2. Click **"Build settings"**
3. Click **"Edit"** button

### Step 3: Configure Build Settings

**Option A: Use amplify.yml (Recommended)**
- Make sure **"amplify.yml"** is selected as the build specification
- This should automatically use the file from your repository
- Click **"Save"**

**Option B: Manual Build Settings**
If amplify.yml isn't working, set these manually:

- **App root:** `/` (or leave empty)
- **Build command:** 
  ```bash
  cd web && npm ci && npm run build
  ```
- **Output directory:** `web/dist`

### Step 4: Redeploy
1. After saving, click **"Redeploy this version"** or wait for auto-redeploy
2. The build should now succeed

---

## Alternative: Check Repository Structure

If it still fails, verify the repository structure:

```bash
# The structure should be:
pinkmoon/
  ├── amplify.yml          # Build config (root level)
  ├── web/
  │   ├── package.json
  │   ├── src/
  │   └── public/
  └── ...
```

Make sure `amplify.yml` is in the **root** of your repository, not in the `web/` folder.

---

## Current amplify.yml Configuration

The `amplify.yml` file is configured as:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - |
          if [ -d "web" ]; then
            cd web
            npm ci
          else
            echo "ERROR: web directory not found"
            ls -la
            exit 1
          fi
    build:
      commands:
        - |
          if [ -d "web" ]; then
            cd web
            npm run build
            echo "Build completed successfully"
            ls -la dist
          else
            echo "ERROR: web directory not found"
            ls -la
            exit 1
          fi
  artifacts:
    baseDirectory: web/dist
    files:
      - '**/*'
  cache:
    paths:
      - web/node_modules/**/*
```

---

## Still Having Issues?

1. **Check build logs** - Look for the actual error message
2. **Verify repository** - Make sure `web/` directory exists in GitHub
3. **Clear cache** - In Amplify console, try clearing the build cache
4. **Check branch** - Make sure you're deploying from the `master` branch

---

## Quick Test Locally

Test the build locally to verify it works:

```bash
cd web
npm ci
npm run build
ls -la dist
```

If this works locally, the issue is with AWS Amplify configuration, not your code.
