# 💕 Only For The Prettiest Girl

A beautiful, high-quality web application with a stunning hot pink theme, interactive pages, background music, and dynamic content. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎨 **Hot Pink Theme** - Beautiful gradient design throughout
- 🎵 **Dynamic Music Player** - Custom music player with play/pause controls and theme-specific music
- 📸 **Scrollable Main Page** - Beautiful photos and texts that scroll down
- 📷 **Camera Page** - "Click To Find The Prettiest Face" - Opens user's camera
- 🎁 **Gift Page** - "Click For Gift" - Hello Kitties dancing with flower rain and cute theme music
- 🔐 **Secrets Page** - Password-protected page (password: moon) with Dyson products collection
- 🏮 **Japanese Theme Page** - "Wanna Hangout 2gether?" - Vintage Japanese pond with Japanese music
- 🎭 **Smooth Animations** - Framer Motion animations for a premium feel
- 📱 **Fully Responsive** - Looks great on all devices
- ☁️ **AWS Ready** - Configured for deployment on AWS with custom domain

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- (Optional) Docker for containerized deployment

### Installation

1. Clone the repository:
```bash
cd pinkmoon
```

2. Install dependencies:
```bash
npm install
```

3. Add your custom content:
   - **Music Files:**
     - `Kya Mujhe Pyaar Hai-(Mr-Jat.in).mp3` - Main background music
     - `public/music/cute-theme.mp3` - Cute theme music for gift page
     - `public/music/japanese-theme.mp3` - Japanese theme music for hangout page
   - **Images:**
     - `public/images/image1.jpg` - Hero/main image
     - `public/images/image2.jpg` - First gallery image
     - `public/images/image3.jpg` - Second gallery image
     - `public/images/image4.jpg` - Final section image
     - `Koi Pond In A Leaf.gif` - Vintage Japanese pond GIF for hangout page

4. Customize the text content:
   - Edit `app/page.tsx` to update all text sections with your custom messages
   - All pages are ready to use - just add your music and images!

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Customizing Content

### Adding Your Images

1. Place your images in `public/images/`
2. Update the image filenames in `app/page.tsx` if needed
3. Images should be high quality (recommended: 1920x1080 or higher)

### Adding Your Music

1. Place your music file in `public/music/background.mp3`
2. For better browser compatibility, also add `background.ogg`
3. The music will auto-play when the page loads (with user interaction)

### Customizing Text

Edit `app/page.tsx` to change:
- Hero section title and subtitle
- Image section captions
- Text section content
- Footer text

### Customizing Colors

The hot pink theme is defined in `tailwind.config.js`. You can adjust:
- `hot-pink` color palette
- Gradient colors
- Glow effects

## 🏗️ Building for Production

```bash
npm run build
npm start
```

## 🐳 Docker Deployment

### Build and run with Docker:

```bash
docker build -t pinkmoon .
docker run -p 3000:3000 pinkmoon
```

### Using Docker Compose:

```bash
docker-compose up -d
```

## ☁️ AWS Deployment

### Option 1: AWS Elastic Beanstalk

1. **Install EB CLI:**
```bash
pip install awsebcli
```

2. **Initialize EB:**
```bash
eb init -p docker pinkmoon-app
```

3. **Create environment:**
```bash
eb create pinkmoon-env
```

4. **Deploy:**
```bash
eb deploy
```

### Option 2: AWS ECS (Elastic Container Service)

1. **Build and push Docker image to ECR:**
```bash
aws ecr create-repository --repository-name pinkmoon
docker build -t pinkmoon .
docker tag pinkmoon:latest <account-id>.dkr.ecr.<region>.amazonaws.com/pinkmoon:latest
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/pinkmoon:latest
```

2. **Create ECS task definition and service**
3. **Set up Application Load Balancer**
4. **Configure Route 53 for custom domain**

### Option 3: AWS Amplify (Easiest)

1. **Connect your repository to AWS Amplify**
2. **Configure build settings:**
   - Build command: `npm run build`
   - Output directory: `.next`
3. **Add custom domain in Amplify console**

### Setting Up Custom Domain

1. **Get SSL Certificate:**
   - Request certificate in AWS Certificate Manager (ACM)
   - Validate domain ownership

2. **Configure Route 53:**
   - Create hosted zone for your domain
   - Create A record pointing to your CloudFront distribution or ALB

3. **Update DNS:**
   - Point your domain's nameservers to Route 53

4. **CloudFront (if using S3/CloudFront):**
   - Create CloudFront distribution
   - Add your domain as alternate domain name
   - Use ACM certificate

### Using the Deployment Script

```bash
chmod +x aws-deploy.sh
./aws-deploy.sh
```

This creates a `pinkmoon-deploy.zip` file ready for upload to AWS.

## 📁 Project Structure

```
pinkmoon/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx             # Main page with all sections
│   └── globals.css          # Global styles and theme
├── components/
│   └── MusicPlayer.tsx      # Music player component
├── public/
│   ├── images/              # Your custom images
│   └── music/               # Your background music
├── aws-config/              # AWS deployment configs
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose config
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS theme
└── package.json             # Dependencies
```

## 🎨 Design Features

- **Hot Pink Gradient Theme** - Consistent pink color palette
- **Smooth Animations** - Framer Motion for premium feel
- **Glass Morphism Effects** - Modern UI elements
- **Responsive Typography** - Beautiful fonts (Playfair Display + Inter)
- **Glow Effects** - Pink glow on images and buttons
- **Custom Scrollbar** - Pink-themed scrollbar

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment-specific settings:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Next.js Config

The app is configured for standalone output (for Docker/AWS deployment) in `next.config.js`.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Docker** - Containerization

## 📄 License

Private project - All rights reserved

## 💝 Notes

This application is designed to be a beautiful, romantic gesture. Customize it with your own images, music, and messages to make it truly special.

---

Made with ❤️ and lots of pink 🌙
