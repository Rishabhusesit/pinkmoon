import { Link } from "react-router-dom";

export default function FindAPrettyFace() {
  return (
    <div className="paintPageContainer">
      {/* Minimal top nav */}
      <div className="paintTopNav">
        <Link className="paintNavBrand" to="/home">ForThePrettiestGirl</Link>
        <Link className="paintNavLink" to="/home">Home</Link>
      </div>

      {/* MS Paint/Word Image - centered, covering most of the page */}
      <div className="paintImageContainer">
        <img 
          src="/images/ms-paint-interface.png" 
          alt="Find A Pretty Face" 
          className="paintImage"
        />
      </div>
    </div>
  );
}
