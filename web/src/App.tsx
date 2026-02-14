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
  const isTVPage = location.pathname === "/tv-room";

  // Trigger flowers every 10 seconds (but not on Hangout, Paint, or TV page)
  useEffect(() => {
    if (isHangoutPage || isPaintPage || isTVPage) return;
    
    const interval = setInterval(() => {
      setFlowerTrigger((prev) => prev + 1);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [isHangoutPage, isPaintPage, isTVPage]);

  // Expose trigger function globally for cat click (but not on Hangout, Paint, or TV page)
  useEffect(() => {
    (window as any).triggerFlowers = () => {
      if (!isHangoutPage && !isPaintPage && !isTVPage) {
        setFlowerTrigger((prev) => prev + 1);
      }
    };
  }, [isHangoutPage, isPaintPage, isTVPage]);

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
      {!isTVPage && <VinylPlayer />}
      {!isHangoutPage && !isPaintPage && !isTVPage && <FlowerShower trigger={flowerTrigger} />}
    </>
  );
}

export default function App() {
  return <AppContent />;
}
