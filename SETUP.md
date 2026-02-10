# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Add Your Content

### Add Your Music
1. Place your music file in `public/music/background.mp3`
2. (Optional) Add `background.ogg` for better browser compatibility

### Add Your Images
Place your images in `public/images/`:
- `image1.jpg` - Main hero/feature image
- `image2.jpg` - First gallery image
- `image3.jpg` - Second gallery image  
- `image4.jpg` - Final section image

**Image Recommendations:**
- Format: JPG or PNG
- Size: 1920x1080 or larger
- Quality: High resolution for best results

### Customize Your Text
Edit `app/page.tsx` to update:
- Hero title and subtitle
- Section titles and descriptions
- All text content with your personal messages

## Step 3: Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Step 4: Build for Production

```bash
npm run build
npm start
```

## Step 5: Deploy to AWS

See `README.md` for detailed AWS deployment instructions.

### Quick AWS Amplify Deployment:
1. Push your code to GitHub
2. Connect repository to AWS Amplify
3. Build settings: `npm run build`
4. Add custom domain in Amplify console

---

**Need help?** Check the full `README.md` for detailed instructions!
