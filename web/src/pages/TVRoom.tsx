import { Link } from "react-router-dom";

export default function TVRoom() {
  return (
    <div className="page tvPage">
      <div className="topNav">
        <Link className="navBrand" to="/">OnlyForThePrettiestGirl</Link>
        <div className="navLinks">
          <Link className="navLink" to="/">Home</Link>
        </div>
      </div>

      <div className="tvLayout">
        <div className="tvText">
          <div className="kicker">VINTAGE ROOM</div>
          <h1 className="h1">A cozy scene, just for you.</h1>
          <p className="p">
            This is the "real TV box" moment. We'll swap in your actual video + tune lighting to match your photos later.
          </p>
        </div>

        <div className="tvShell">
          <div className="tvFrame">
            <div className="crtGlass">
              <video
                className="tvVideo"
                src="/video/clip.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="scanlines" />
              <div className="vignette" />
            </div>

            <div className="tvSide">
              <div className="knob big" />
              <div className="knob" />
              <div className="speaker">
                {Array.from({ length: 8 }).map((_, i) => <div key={i} className="slit" />)}
              </div>
            </div>
          </div>

          <div className="tvShadow" />
        </div>
      </div>
    </div>
  );
}
