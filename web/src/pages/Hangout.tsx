import { Link } from "react-router-dom";

export default function Hangout() {
  return (
    <div className="page">
      <div className="topNav">
        <Link className="navBrand" to="/">OnlyForThePrettiestGirl</Link>
        <div className="navLinks">
          <Link className="navLink" to="/">Home</Link>
        </div>
      </div>
      <div style={{ marginTop: 26 }}>
        <div className="kicker">HANGOUT</div>
        <h1 className="h1">Wanna Hangout 2gether?</h1>
        <p className="p">This page will be redesigned with premium styling soon.</p>
      </div>
    </div>
  );
}
