import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAudio } from "../audio/AudioProvider";

export default function Hangout() {
  const { setTrack } = useAudio();
  const ringRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ down: boolean; startX: number; startY: number; panX: number; panY: number }>({ 
    down: false, 
    startX: 0, 
    startY: 0, 
    panX: 0, 
    panY: 0 
  });

  useEffect(() => {
    setTrack("/music/default.mp3");
  }, [setTrack]);

  // Globe-trotting cursor: smooth drag-to-pan (no zoom, no auto-pan)
  useEffect(() => {
    const ring = ringRef.current;
    const container = videoContainerRef.current;
    if (!ring || !container) return;

    let raf = 0;
    
    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Cursor position
        ring.style.transform = `translate(${x}px, ${y}px) rotate(var(--tilt, 0deg))`;

        // Rotation angle for compass
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const dx = x - centerX;
        const dy = y - centerY;
        const ang = Math.atan2(dy, dx) * (180 / Math.PI);
        ring.style.setProperty("--ang", `${ang}deg`);

        // Globe-trotting: drag to pan (smooth, no jitter)
        if (dragRef.current.down) {
          const deltaX = (e.clientX - dragRef.current.startX) * 0.5; // Smooth pan speed
          const deltaY = (e.clientY - dragRef.current.startY) * 0.5;
          
          dragRef.current.panX = dragRef.current.panX + deltaX;
          dragRef.current.panY = dragRef.current.panY + deltaY;
          
          // Clamp pan limits (prevent over-panning - keep video in frame)
          const maxPan = 8; // Max 8% pan to keep video in frame
          dragRef.current.panX = Math.max(-maxPan, Math.min(maxPan, dragRef.current.panX));
          dragRef.current.panY = Math.max(-maxPan, Math.min(maxPan, dragRef.current.panY));
          
          container.style.transform = `translate(${dragRef.current.panX}%, ${dragRef.current.panY}%)`;
          
          // Update drag start for next frame
          dragRef.current.startX = e.clientX;
          dragRef.current.startY = e.clientY;

          // Tilt cursor on drag
          const tilt = Math.max(-15, Math.min(15, deltaX / 10));
          ring.style.setProperty("--tilt", `${tilt}deg`);
        } else {
          ring.style.setProperty("--tilt", `0deg`);
        }
      });
    };

    const onDown = (e: MouseEvent) => {
      dragRef.current.down = true;
      dragRef.current.startX = e.clientX;
      dragRef.current.startY = e.clientY;
      ring.classList.add("svCursorDown");
      if (container) {
        container.classList.add("dragging");
      }
    };
    
    const onUp = () => {
      dragRef.current.down = false;
      ring.classList.remove("svCursorDown");
      if (container) {
        container.classList.remove("dragging");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const PLAYLIST_URL = "https://open.spotify.com/playlist/2oEb2pw2aYknsPmf148mY9?si=QmTSqNRDQlSKCXWec3gqXw&pi=YidzFiElRMqMu";


  return (
    <div className="hangoutV2">
      {/* custom globe-trotting cursor */}
      <div ref={ringRef} className="svCursor" />

      {/* GIF background layer */}
      <div className="pondGifBackground" />

      {/* Local video with drag-to-pan (no zoom) */}
      <div 
        ref={videoContainerRef}
        className="youtubeContainer"
      >
        <video
          className="pondVideo"
          src="/video/pond-video-trimmed.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* overlays */}
      <div className="hangoutFilm" />
      <div className="hangoutTint" />

      {/* Top nav with premium brand */}
      <div className="hangoutTop">
        <Link className="hangoutBrandPremium" to="/home">
          WannaLiveWithFish?
        </Link>
        <Link className="hangoutHome" to="/home">
          Home
        </Link>
      </div>

      {/* Left side tap me section */}
      <div className="fishSurpriseLeft">
        <div className="tapMeLabel">TAP ME</div>
        <img 
          src="/gifs/fish.gif" 
          alt="Fish" 
          className="fishGifLeft"
          onClick={() => {
            window.open(PLAYLIST_URL, '_blank');
          }}
        />
      </div>
    </div>
  );
}
