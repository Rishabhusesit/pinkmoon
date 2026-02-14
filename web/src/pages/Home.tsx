import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      {/* Top nav with premium brand */}
      <div className="hangoutTop">
        <Link className="hangoutBrandPremium" to="/home">
          WannaLiveWithFish?
        </Link>
        <Link className="hangoutHome" to="/home">
          Home
        </Link>
      </div>
      
      <div className="topNav" style={{ marginTop: 18 }}>
        <div className="navLinks">
          <Link className="navLink" to="/tv-room">Vintage TV Room</Link>
          <Link className="navLink" to="/click-for-gift">Click For Gift</Link>
          <Link className="navLink" to="/click-to-find-the-prettiest-face">Find Prettiest Face</Link>
          <Link className="navLink" to="/find-a-pretty-face">Find A Pretty Face</Link>
          <Link className="navLink" to="/wanna-hangout-2gether">Hangout</Link>
        </div>
      </div>

      <div style={{ marginTop: 26 }}>
        <div className="kicker">LIGHT PINK • RICH • PREMIUM</div>
        <h1 className="h1">Now it looks grown & premium.</h1>
        <p className="p">
          A beautiful, sophisticated experience crafted with intention. 
          Each page tells a story, each moment is curated.
        </p>
      </div>
    </div>
  );
}
