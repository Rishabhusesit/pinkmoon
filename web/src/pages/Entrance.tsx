import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { label: "Home", href: "/home" },
  { label: "Vintage TV Room", href: "/tv-room" },
  { label: "Click For Gift", href: "/click-for-gift" },
  { label: "Find Prettiest Face", href: "/click-to-find-the-prettiest-face" },
  { label: "Find A Pretty Face", href: "/find-a-pretty-face" },
  { label: "Hangout", href: "/wanna-hangout-2gether" },
];

const socials = [
  { label: "Instagram", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "Discord", href: "#" }
];

export default function Entrance() {
  const [open, setOpen] = useState(false);

  const hero = useMemo(() => {
    // Replace with your own "title card" image (high-res PNG/WebP)
    return "/images/entrance-title.png";
  }, []);

  return (
    <div className="entrance">
      <div className="entranceTop">
        <button className="menuBtn" onClick={() => setOpen(true)}>
          Menu
        </button>
      </div>

      <div className="entranceCenter">
        <img className="entranceHero" src={hero} alt="OnlyForThePrettiestGirl" />
      </div>

      {open && (
        <div className="menuOverlay" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div className="menuPanel" onClick={(e) => e.stopPropagation()}>
            <div className="menuHeader">
              <div className="menuTitle">Menu</div>
              <button className="menuClose" onClick={() => setOpen(false)}>✕</button>
            </div>

            <div className="menuList">
              {links.map((l) => (
                <Link key={l.label} className="menuLink" to={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
              ))}
            </div>

            <div className="menuDivider" />

            <div className="menuSocials">
              {socials.map((s) => (
                <a key={s.label} className="menuSocial" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
