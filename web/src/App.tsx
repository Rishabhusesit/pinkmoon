import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import PasswordGate from "./components/PasswordGate";
import Home from "./pages/Home";
import TVRoom from "./pages/TVRoom";
import ClickForGift from "./pages/ClickForGift";
import ClickToFindFace from "./pages/ClickToFindFace";
import Secrets from "./pages/Secrets";
import Hangout from "./pages/Hangout";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="app">
      {!unlocked && <PasswordGate onUnlocked={() => setUnlocked(true)} />}

      <Routes>
        <Route path="/" element={unlocked ? <Home /> : <BlurredBackdrop />} />
        <Route path="/tv-room" element={unlocked ? <TVRoom /> : <Navigate to="/" replace />} />
        <Route path="/click-for-gift" element={unlocked ? <ClickForGift /> : <Navigate to="/" replace />} />
        <Route path="/click-to-find-the-prettiest-face" element={unlocked ? <ClickToFindFace /> : <Navigate to="/" replace />} />
        <Route path="/secrets" element={unlocked ? <Secrets /> : <Navigate to="/" replace />} />
        <Route path="/wanna-hangout-2gether" element={unlocked ? <Hangout /> : <Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function BlurredBackdrop() {
  return (
    <div className="lockedView">
      <div className="hero">
        <div className="brand">OnlyForThePrettiestGirl</div>
        <div className="tagline">Private issue. Locked until you enter the password.</div>
      </div>
    </div>
  );
}
