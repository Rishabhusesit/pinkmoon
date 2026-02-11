# Setup Instructions - Node + React Stack

## Project Structure
```
pinkmoon/
├── server/          # Node.js Express backend
└── web/             # React Vite frontend
```

## Setup Steps

### 1. Backend Setup
```bash
cd server
npm install
```

Create `server/.env` file:
```
APP_PASSWORD=Moon
```

Run backend:
```bash
npm run dev
```
Backend runs on: http://localhost:3001

### 2. Frontend Setup
```bash
cd web
npm install
```

Run frontend:
```bash
npm run dev
```
Frontend runs on: http://localhost:5173

## Features

✅ **Premium Windows Password Gate** - Retro but sophisticated
✅ **Light Rich Pink Theme** - Editorial, tasteful palette
✅ **Vintage TV Room** - Cozy room with CRT TV playing video
✅ **Node.js Backend** - Ready for AI integrations
✅ **React + Vite** - Fast, modern frontend

## Add Your Video

Place your video file at:
```
web/public/video/clip.mp4
```

## Next Steps

- Add AI integrations via `/api/ai` endpoint
- Redesign other pages (Gift, Camera, Secrets, Hangout) with premium styling
- Add real photos and assets
