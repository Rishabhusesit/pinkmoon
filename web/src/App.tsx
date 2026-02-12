import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import HomeHub from "./pages/HomeHub";
import TVRoom from "./pages/TVRoom";
import Secrets from "./pages/Secrets";
import Surprise from "./pages/Surprise";
import Hangout from "./pages/Hangout";
import VinylPlayer from "./components/VinylPlayer";
import FlowerShower from "./components/FlowerShower";

function AppContent() {
  const [flowerTrigger, setFlowerTrigger] = useState(0);
  const location = useLocation();
  const isHangoutPage = location.pathname === "/hangout";

  // Trigger flowers every 10 seconds (but not on Hangout page)
  useEffect(() => {
    if (isHangoutPage) return; // Don't trigger on Hangout page
    
    const interval = setInterval(() => {
      setFlowerTrigger((prev) => prev + 1);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [isHangoutPage]);

  // Expose trigger function globally for cat click (but not on Hangout)
  useEffect(() => {
    (window as any).triggerFlowers = () => {
      if (!isHangoutPage) {
        setFlowerTrigger((prev) => prev + 1);
      }
    };
  }, [isHangoutPage]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeHub />} />
        <Route path="/home" element={<HomeHub />} />
        <Route path="/tv-room" element={<TVRoom />} />
        <Route path="/secrets" element={<Secrets />} />
        <Route path="/surprise" element={<Surprise />} />
        <Route path="/hangout" element={<Hangout />} />

        {/* no crashes on wrong routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <VinylPlayer />
      {!isHangoutPage && <FlowerShower trigger={flowerTrigger} />}
    </>
  );
}

export default function App() {
  return <AppContent />;
}
