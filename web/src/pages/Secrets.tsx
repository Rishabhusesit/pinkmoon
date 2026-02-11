import { Link } from "react-router-dom";

export default function Secrets() {
  return (
    <div className="page">
      <div className="topNav">
        <Link className="navBrand" to="/">OnlyForThePrettiestGirl</Link>
        <div className="navLinks">
          <Link className="navLink" to="/">Home</Link>
        </div>
      </div>
      <div style={{ marginTop: 26 }}>
        <div className="kicker">SECRETS</div>
        <h1 className="h1">Secrets</h1>
        <p className="p">This page will be redesigned with premium styling soon.</p>
      </div>
    </div>
  );
}
