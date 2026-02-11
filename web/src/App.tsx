import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomeHub from "./pages/HomeHub";
import TVRoom from "./pages/TVRoom";
import Secrets from "./pages/Secrets";
import Surprise from "./pages/Surprise";
import Hangout from "./pages/Hangout";
import VinylPlayer from "./components/VinylPlayer";
import FlowerShower from "./components/FlowerShower";

export default function App() {
  const [flowerTrigger, setFlowerTrigger] = useState(0);

  // Trigger flowers every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFlowerTrigger((prev) => prev + 1);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Expose trigger function globally for cat click
  useEffect(() => {
    (window as any).triggerFlowers = () => {
      setFlowerTrigger((prev) => prev + 1);
    };
  }, []);

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
      <FlowerShower trigger={flowerTrigger} />
    </>
  );
}
