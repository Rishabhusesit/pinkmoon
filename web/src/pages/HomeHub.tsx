import { Link } from "react-router-dom";
import PasswordGate from "../components/PasswordGate";
import { useState, useEffect } from "react";

const routes = [
  { label: "TV ROOM", to: "/tv-room" },
  { label: "SECRETS", to: "/secrets" },
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
        <div className="sectionTitle">EXPLORE</div>
        <div className="sectionContent">
          <p>Discover hidden moments, secret spaces, and special surprises crafted just for you.</p>
        </div>
      </div>

      <div className="coverSection">
        <div className="sectionTitle">MEMORIES</div>
        <div className="sectionContent">
          <p>Every page holds a piece of our story, waiting to be explored.</p>
        </div>
      </div>

      <div className="coverSection">
        <div className="sectionTitle">MORE TO COME</div>
        <div className="sectionContent">
          <p>This space is always evolving, just like us.</p>
        </div>
      </div>

      {/* Social Links Banner */}
      <div className="socialBanner">
        <div className="socialTitle">CONNECT</div>
        <div className="socialLinks">
          <a href="#" className="socialLink" onClick={(e) => e.preventDefault()}>Instagram</a>
          <a href="#" className="socialLink" onClick={(e) => e.preventDefault()}>Spotify</a>
          <a href="#" className="socialLink" onClick={(e) => e.preventDefault()}>Twitter</a>
          <a href="#" className="socialLink" onClick={(e) => e.preventDefault()}>TikTok</a>
        </div>
        <div className="socialFooter">♡ ForThePrettiestGirl ♡</div>
      </div>
    </div>
  );
}
