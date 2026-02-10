# ⚡ Quick Cloud Deployment

## Fastest Way: Vercel (2 minutes)

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Deploy
```bash
vercel
```

That's it! Your app will be live in ~2 minutes.

### Step 3: Production Deploy
```bash
vercel --prod
```

---

## Alternative: Deploy via GitHub + Vercel Web UI

1. **Create GitHub repo** (if you haven't):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # Create repo on GitHub, then:
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com)**
   - Sign up with GitHub
   - Click "Add New Project"
   - Import your repo
   - Click "Deploy"

Done! 🎉

---

## Add Custom Domain (Optional)

1. Go to your project on Vercel
2. Settings → Domains
3. Add your domain
4. Follow DNS instructions

---

**Your app will be live at: `https://your-project.vercel.app`**

For detailed instructions, see `DEPLOY.md`
