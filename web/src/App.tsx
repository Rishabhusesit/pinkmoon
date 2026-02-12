import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import HomeHub from "./pages/HomeHub";
import TVRoom from "./pages/TVRoom";
import FindAPrettyFace from "./pages/FindAPrettyFace";
import Surprise from "./pages/Surprise";
import Hangout from "./pages/Hangout";
import VinylPlayer from "./components/VinylPlayer";
import FlowerShower from "./components/FlowerShower";

function AppContent() {
  const [flowerTrigger, setFlowerTrigger] = useState(0);
  const location = useLocation();
  const isHangoutPage = location.pathname === "/hangout";
  const isPaintPage = location.pathname === "/find-a-pretty-face";

  // Trigger flowers every 10 seconds (but not on Hangout or Paint page)
  useEffect(() => {
    if (isHangoutPage || isPaintPage) return; // Don't trigger on Hangout or Paint page
    
    const interval = setInterval(() => {
      setFlowerTrigger((prev) => prev + 1);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [isHangoutPage, isPaintPage]);

  // Expose trigger function globally for cat click (but not on Hangout or Paint page)
  useEffect(() => {
    (window as any).triggerFlowers = () => {
      if (!isHangoutPage && !isPaintPage) {
        setFlowerTrigger((prev) => prev + 1);
      }
    };
  }, [isHangoutPage, isPaintPage]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeHub />} />
        <Route path="/home" element={<HomeHub />} />
        <Route path="/tv-room" element={<TVRoom />} />
        <Route path="/find-a-pretty-face" element={<FindAPrettyFace />} />
        <Route path="/surprise" element={<Surprise />} />
        <Route path="/hangout" element={<Hangout />} />

        {/* no crashes on wrong routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isPaintPage && <VinylPlayer />}
      {!isHangoutPage && !isPaintPage && <FlowerShower trigger={flowerTrigger} />}
    </>
  );
}

export default function App() {
  return <AppContent />;
}
