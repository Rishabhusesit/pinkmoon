import { useState } from "react";

export default function PasswordGate({ onUnlocked }: { onUnlocked: () => void }) {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const unlock = async () => {
    setErr("");
    const password = pwd.trim();
    
    // ✅ Client-side fallback: check password locally if backend fails
    // Case-insensitive check for moon/Moon/MOON
    const checkPassword = (pwd: string) => {
      return pwd.toLowerCase() === "moon";
    };

    // ✅ Always check client-side first (case-insensitive)
    if (checkPassword(password)) {
      onUnlocked();
      return;
    }

    // ✅ Also try backend if available (but client-side is primary)
    try {
      const r = await fetch("http://localhost:3001/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await r.json();
      if (data.ok) {
        onUnlocked();
        return;
      }
    } catch {
      // Backend not running - that's fine, we already checked client-side
    }
    
    // Wrong password
    setErr("Wrong password.");
  };

  return (
    <div className="overlay95">
      <div className="win95" role="dialog" aria-modal="true">
        <div className="win95bar">
          <div className="barTitle">System message</div>
          <button className="barClose" onClick={() => setErr("Nice try 🙂")} aria-label="close">
            ✕
          </button>
        </div>

        <div className="win95body">
          <div className="win95h">Enter your password</div>

          <label className="win95label">Enter Your Name</label>
          <div className="win95inputWrapper">
            <input
              className="win95input"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Enter Your Name"
              type={showPassword ? "text" : "password"}
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && unlock()}
            />
            <button
              type="button"
              className="win95eyeBtn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "👁" : "👁‍🗨"}
            </button>
          </div>

          {err && <div className="win95err">{err} (hint: Enter "Moon")</div>}

          <button className="win95btn" onClick={unlock}>
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
}
