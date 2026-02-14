import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAudio } from "../audio/AudioProvider";

export default function Surprise() {
  const { setTrack } = useAudio();

  useEffect(() => {
    setTrack("/music/cute.mp3");
  }, [setTrack]);
  return (
    <div className="surprisePage">
      {/* Background GIF */}
      <div className="surpriseBgGif"></div>
      
      {/* Top nav with premium brand */}
      <div className="hangoutTop">
        <Link className="hangoutBrandPremium" to="/home">
          WannaLiveWithFish?
        </Link>
        <Link className="hangoutHome" to="/home">
          Home
        </Link>
      </div>

      <div className="surpriseContent">
        {/* Top Corner Characters - Tilted */}
        <div className="surpriseCharLeft">
          <img src="/images/char-left.jpeg" alt="Left Character" className="surpriseCharImg" />
        </div>
        
        <div className="surpriseCharRight">
          <img src="/images/char-right.jpg" alt="Right Character" className="surpriseCharImg" />
        </div>
        
        {/* Bottom Corner Characters - Tilted */}
        <div className="surpriseCharBottomLeft">
          <img src="/images/char-bottom-left.png" alt="Bottom Left Character" className="surpriseCharImg" />
        </div>
        
        <div className="surpriseCharBottomRight">
          <img src="/images/char-bottom-right.png" alt="Bottom Right Character" className="surpriseCharImg" />
        </div>
        
        {/* Center Title */}
        <div className="surpriseHeaderText">
          <div className="surpriseTitle">ForYouPage</div>
        </div>
        
        {/* GIFs Section */}
        <div className="surpriseGifsContainer">
          <div className="surpriseGifItem">
            <img src="/gifs/hello-kitty.gif?v=2" alt="Hello Kitty" className="surpriseGif" />
          </div>
          <div className="surpriseGifItem">
            <img src="/gifs/hello-kitty-middle.gif" alt="Hello Kitty" className="surpriseGif" />
          </div>
          <div className="surpriseGifItem">
            <img src="/gifs/stitch-dancing.gif" alt="Stitch Dancing" className="surpriseGif" />
          </div>
        </div>
      </div>
    </div>
  );
}
