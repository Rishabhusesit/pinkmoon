import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAudio } from "../audio/AudioProvider";

export default function Surprise() {
  const { setTrack } = useAudio();

  useEffect(() => {
    setTrack("/music/cute.mp3");
  }, [setTrack]);
  return (
    <div className="page">
      <div className="topNav">
        <Link className="navBrand" to="/home">ForThePrettiestGirl</Link>
        <Link className="navLink" to="/home">Home</Link>
      </div>

      <div style={{ marginTop: 24 }}>
        <div className="kicker">SURPRISE</div>
        <h1 className="h1">Dancing time 💗</h1>
        <p className="p">Put your GIFs in /public/gifs and they'll blend into the theme.</p>

        <div className="card" style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <div className="kicker">GIF 1</div>
            <img src="/gifs/kitty.gif" alt="Hello Kitty" style={{ width: "100%", borderRadius: 16 }} />
          </div>
          <div>
            <div className="kicker">GIF 2</div>
            <img src="/gifs/stitch.gif" alt="Stitch" style={{ width: "100%", borderRadius: 16 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
