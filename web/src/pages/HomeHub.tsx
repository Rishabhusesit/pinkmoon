import { Link } from "react-router-dom";
import PasswordGate from "../components/PasswordGate";
import { useState, useEffect } from "react";

const routes = [
  { label: "TV ROOM", to: "/tv-room" },
  { label: "FIND A PRETTY FACE", to: "/find-a-pretty-face" },
  { label: "SURPRISE", to: "/surprise" },
  { label: "HANGOUT 2GETHER", to: "/hangout" },
];

export default function HomeHub() {
  // ✅ Check localStorage IMMEDIATELY (synchronously) on mount
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("unlocked") === "1";
    }
    return false;
  });
  const [isChecking, setIsChecking] = useState(true);
  const [showConnect4Life, setShowConnect4Life] = useState(false);

  useEffect(() => {
    // Double-check after mount (in case localStorage changed)
    const stored = localStorage.getItem("unlocked");
    if (stored === "1") {
      setUnlocked(true);
    }
    setIsChecking(false);
  }, []);

  const onUnlocked = () => {
    localStorage.setItem("unlocked", "1");
    setUnlocked(true);
  };

  // ✅ Show password gate if not unlocked (don't wait for check)
  if (!unlocked || isChecking) {
    return <PasswordGate onUnlocked={onUnlocked} />;
  }

  // ✅ Show cover page only after unlock
  return (
    <div className="cover">
      {/* Eye banner top strip ONLY */}
      <div className="eyeBanner" />
      
      {/* Vintage mosaic banner */}
      <div className="coverMosaicBanner" />
      <div className="coverGrain" />

      {/* Top tiny nav - moved higher */}
      <div className="coverTop">
        <div className="coverBrand">ForThePrettiestGirl</div>
        <div className="coverMiniNav">
          {routes.map((r) => (
            <Link key={r.to} className="miniLink" to={r.to}>
              {r.label}
            </Link>
          ))}
        </div>
        <img src="/gifs/pisces-monochromian.gif" alt="Pisces" className="coverTopGif" />
      </div>

      {/* BIG headline */}
      <div className="coverHero">
        <div className="coverTitle">FOR THE PRETTIEST GIRL</div>
      </div>

      {/* Feature list */}
      <div className="coverGrid">
        <div className="coverCol">
          {routes.slice(0, 2).map((r) => (
            <Link key={r.to} className="coverRow" to={r.to}>
              <span className="rowLeft">{r.label}</span>
              <span className="rowRight">OPEN</span>
            </Link>
          ))}
        </div>

        {/* GIF in center gap */}
        <div className="coverGifContainer">
          <img 
            src="/gifs/carrd.gif" 
            alt="Cute cat" 
            className="coverGif"
            style={{ display: 'block', visibility: 'visible', width: '180px', height: 'auto', cursor: 'pointer' }}
            onClick={() => {
              if ((window as any).triggerFlowers) {
                (window as any).triggerFlowers();
              }
            }}
          />
        </div>

        <div className="coverCol">
          {routes.slice(2, 4).map((r) => (
            <Link key={r.to} className="coverRow" to={r.to}>
              <span className="rowLeft">{r.label}</span>
              <span className="rowRight">OPEN</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Scrollable content sections */}
      <div className="coverSection">
        <div className="sectionTitle">5iveStarKavi</div>
        <div className="sectionContent">
          <p>Kaash hum sapno se jagne ke baad bhi unhi sapno mein asal zindagi ko paate<br />
          Jagne ke baad bhi sab sapno jaisa hota<br />
          Duniyaa bilkul sapne kaisi shaant hoti, tumhara saathi sapno ki tarah tumhe humesha tumhe tumhare sath hi dikhta.<br />
          Sapno se uthne ke baad ki pehli chai bhi sapno jaisi hoti, shayad sapno jaisi chai mein tumhare hone ki khushboo bhi rehti.</p>
        </div>
      </div>

      {/* MEMORIES Section - Full-bleed images style */}
      <div className="memoriesSection">
        {/* Images will be added here - placeholder for now */}
        <div className="memoriesImageContainer">
          <img src="/images/memory-1.png" alt="5 STAR" className="memoriesImage" />
        </div>
      </div>

      <div className="coverSection">
        <div className="sectionTitle">5iveStarKavi</div>
        <div className="sectionContent">
          <p>Tumne bataya tha tumhara bazaar jaana hua tha, meri nazre bhi uss bazaar mein hokarr aayi, nazaro ko bazaar kaa raasta toh nhi maaloom tha parr tumhari baatein yaad thi ki tum iss bazaar se hi suit silwaati ho, nazare harr suit ki dukaan ke bahar tumhari khushbu dhoondh rahi thi...</p>
        </div>
      </div>

      {/* Social Links Banner */}
      <div className="socialBanner">
        <div className="socialTitle">CONNECT</div>
        <div className="socialLinks">
          <a href="https://instagram.com/aintgonnalack" target="_blank" rel="noopener noreferrer" className="socialLink">Instagram</a>
          <a 
            href="mailto:rishabhlikesmoon@gmail.com" 
            className="socialLink"
            onClick={() => {
              window.location.href = 'mailto:rishabhlikesmoon@gmail.com';
            }}
          >
            Mail
          </a>
          <a href="https://open.spotify.com/user/qoo0abie7r8x11qhza1slo59s?si=RswoIJYpS5i2E-DYehSp0A" target="_blank" rel="noopener noreferrer" className="socialLink">Spotify</a>
          <a href="#" className="socialLink" onClick={(e) => { e.preventDefault(); setShowConnect4Life(true); }}>Connect4Life</a>
        </div>
        <div className="socialFooter">ForThePrettiestGirl</div>
        <img src="/gifs/pisces-monochromian.gif" alt="Pisces" className="socialBannerGif" />
      </div>

      {/* Connect4Life Modal */}
      {showConnect4Life && (
        <div className="connect4LifeModal" onClick={() => setShowConnect4Life(false)}>
          <div className="connect4LifeModalContent" onClick={(e) => e.stopPropagation()}>
            <button className="connect4LifeClose" onClick={() => setShowConnect4Life(false)}>×</button>
            <img src="/images/connect4life.jpg" alt="Connect4Life" className="connect4LifeImage" />
          </div>
        </div>
      )}
    </div>
  );
}
