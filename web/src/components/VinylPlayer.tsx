import { useAudio } from "../audio/AudioProvider";

export default function VinylPlayer() {
  const { isPlaying, toggle } = useAudio();

  return (
    <button className="vinylWrap" onClick={() => toggle().catch(() => {})} aria-label="music toggle">
      <div className="knobContainer">
        <div className={`knob ${isPlaying ? "spin" : ""}`}>
          <div className="knobHandle">
            <div className="knobMarker" />
          </div>
        </div>
      </div>
      <div className="vinylTag">{isPlaying ? "PAUSE" : "PLAY"}</div>
    </button>
  );
}
