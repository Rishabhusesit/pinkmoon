import { Link } from "react-router-dom";

export default function Secrets() {
  return (
    <div className="page">
      <div className="topNav">
        <Link className="navBrand" to="/home">ForThePrettiestGirl</Link>
        <Link className="navLink" to="/home">Home</Link>
      </div>

      <div style={{ marginTop: 24 }}>
        <div className="kicker">SECRETS</div>
        <h1 className="h1">Your texts go here</h1>
        <p className="p">
          Paste ALL your "Secrets" text exactly here and I'll format it like a premium zine spread (columns, stamps, tape, notes).
        </p>

        <div className="card" style={{ marginTop: 14 }}>
          <div className="kicker">CONTENT</div>
          <div className="p" style={{ whiteSpace: "pre-wrap" }}>
{`(PASTE YOUR TEXTS HERE)
- moon / Moon password
- Dyson strings collection
- anything else you wrote`}
          </div>
        </div>
      </div>
    </div>
  );
}
