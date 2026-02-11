import { useState } from "react";
import { Link } from "react-router-dom";

const MOVIES = [
  { title: "Option 1", src: "/images/tv/1.jpg" },
  { title: "Option 2", src: "/images/tv/2.jpg" },
  { title: "Option 3", src: "/images/tv/3.jpg" },
  { title: "Option 4", src: "/images/tv/4.jpg" }
];

export default function TVRoom() {
  const [i, setI] = useState(0);
  const next = () => setI((x) => (x + 1) % MOVIES.length);

  return (
    <div className="tvRoom">
      <div className="tvBg" />
      <div className="grain" />

      <div className="topNavLite">
        <Link className="navBrand" to="/home">ForThePrettiestGirl</Link>
        <Link className="navPill" to="/home">Home</Link>
      </div>

      <div className="tvStage">
        <div className="tvCopy">
          <div className="kicker2">VINTAGE ROOM</div>
          <h1 className="h1lite">Pick a "movie" 🎞️</h1>
          <p className="plite">Click the knob to switch options. We'll replace these with your real photos.</p>
        </div>

        <div className="tvSetWrap">
          <div className="tvSet">
            <div className="tvScreen">
              <img className="tvImg" src={MOVIES[i].src} alt={MOVIES[i].title} />
              <div className="scanlines2" />
              <div className="vignette2" />
              <div className="tvLabel">{MOVIES[i].title}</div>
            </div>

            <div className="tvSidePanel">
              <button className="knobBtn" onClick={next} aria-label="next">
                <div className="knob3d" />
                <div className="knobText">NEXT</div>
              </button>

              <div className="speaker2">
                {Array.from({ length: 10 }).map((_, k) => <div key={k} className="slit2" />)}
              </div>
            </div>
          </div>
          <div className="tvCastShadow" />
        </div>
      </div>
    </div>
  );
}
