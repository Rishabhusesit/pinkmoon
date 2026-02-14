import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const TV_IMAGES = ["/tv/1.jpg", "/tv/2.jpg", "/tv/3.jpg"]; // Rotating 3 images

export default function TVRoom() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate between 3 images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % TV_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ✅ TV Screen position - adjust these to match the TV in your room image
  const SCREEN = {
    left: 20,     // % from left
    top: 22,      // % from top
    width: 44,    // % width
    height: 63.8,   // % height
  };

  return (
    <div className="tvOnlyPage">
      <img className="tvRoomImg" src="/tv/room.jpeg" alt="Vintage room" />
      
      {/* TV Screen Overlay - positioned over the TV in the room image */}
      <div
        className="tvScreenOverlay"
        style={{
          left: `${SCREEN.left}%`,
          top: `${SCREEN.top}%`,
          width: `${SCREEN.width}%`,
          height: `${SCREEN.height}%`,
        }}
      >
        <img 
          key={currentImageIndex}
          className="tvScreenImg" 
          src={TV_IMAGES[currentImageIndex]} 
          alt="TV content" 
        />
        <div className="tvScanlines" />
        <div className="tvVignette" />
        <div className="tvGlass" />
      </div>
      
      {/* Top nav with premium brand */}
      <div className="hangoutTop">
        <Link className="hangoutBrandPremium" to="/home">
          WannaLiveWithFish?
        </Link>
        <Link className="hangoutHome" to="/home">
          Home
        </Link>
      </div>
    </div>
  );
}
