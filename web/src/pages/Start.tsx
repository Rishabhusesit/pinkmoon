import { Link } from "react-router-dom";
import PasswordGate from "../components/PasswordGate";

const nav = ["Store", "Archive", "Contact", "FAQ & Terms", "Order Tracker", "Press", "Early Access", "Listen"];

export default function Start({ unlocked, onUnlocked }: { unlocked: boolean; onUnlocked: () => void }) {
  return (
    <div className="startWrap">
      {/* background layer */}
      <div className="startBg" />
      <div className="grain" />

      {/* left nav like cameupinthedrought */}
      <aside className="startNav">
        <div className="stamp">DROUGHT<br/>VIBE</div>
        <nav className="navList">
          {nav.map((x) => (
            <a key={x} href="#" className="navItem" onClick={(e) => e.preventDefault()}>
              {x}
            </a>
          ))}
        </nav>
      </aside>

      {/* center hero image placeholder */}
      <main className="startCenter">
        <div className="centerCard">
          <div className="brandMark">ForThePrettiestGirl</div>
          <div className="subMark">pink • grunge • vintage</div>
        </div>
      </main>

      {/* modal on top */}
      {!unlocked && <PasswordGate onUnlocked={onUnlocked} />}
      {unlocked && (
        <Link className="enterBtn" to="/home">
          ENTER →
        </Link>
      )}
    </div>
  );
}
