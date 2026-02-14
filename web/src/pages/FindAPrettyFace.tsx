import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function FindAPrettyFace() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    // Access camera when component mounts
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'user', // Front-facing camera
            width: { ideal: 640 },
            height: { ideal: 480 }
          }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setCameraError("Unable to access camera. Please allow camera permissions.");
      }
    };

    startCamera();

    // Cleanup: stop camera stream when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="paintPageContainer">
      {/* Top nav with premium brand */}
      <div className="hangoutTop">
        <Link className="hangoutBrandPremium" to="/home">
          WannaLiveWithFish?
        </Link>
        <Link className="hangoutHome" to="/home">
          Home
        </Link>
      </div>

      {/* MS Paint/Word Image - centered, covering most of the page */}
      <div className="paintImageContainer">
        <img 
          src="/images/ms-paint-interface.png" 
          alt="Find A Pretty Face" 
          className="paintImage"
        />
        
        {/* Camera feed - positioned over the white canvas area */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="paintCameraFeed"
        />
        
        {cameraError && (
          <div className="paintCameraError">{cameraError}</div>
        )}
      </div>
    </div>
  );
}
