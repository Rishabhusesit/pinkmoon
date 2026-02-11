import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAudio } from "../audio/AudioProvider";

export default function Hangout() {
  const { setTrack } = useAudio();

  useEffect(() => {
    setTrack("/music/default.mp3");
  }, [setTrack]);

  return (
    <div className="hangout">
      {/* Full-screen Koi Pond GIF background */}
      <div className="hangoutGifBg" />
      <div className="hangoutOverlay" />

      <div className="topNavLite">
        <Link className="navBrand" to="/home">ForThePrettiestGirl</Link>
        <Link className="navPill" to="/home">Home</Link>
      </div>

      <div className="hangoutCard">
        <div className="kicker2">WANNA HANGOUT 2GETHER?</div>
        <h1 className="h1lite">Pond-side park 🌿</h1>
        <p className="plite">Add your playlist link below — it'll look like part of the scene.</p>

        <a className="playlistBtn" href="PASTE_PLAYLIST_LINK_HERE" target="_blank" rel="noreferrer">
          Open Playlist ↗
        </a>
      </div>
    </div>
  );
}
