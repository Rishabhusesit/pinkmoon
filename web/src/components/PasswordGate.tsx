import { useState } from "react";

export default function PasswordGate({ onUnlocked }: { onUnlocked: () => void }) {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");

  const unlock = async () => {
    setErr("");
    try {
      const r = await fetch("http://localhost:3001/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd })
      });
      const data = await r.json();
      if (data.ok) onUnlocked();
      else setErr("Wrong password. Hint: Moon 🌙");
    } catch {
      setErr("Server not reachable. Start backend on :3001");
    }
  };

  return (
    <div className="overlay">
      <div className="winModal" role="dialog" aria-modal="true">
        <div className="winTitleBar">
          <div className="winIcon" />
          <div className="winTitle">Enter your password</div>
          <div className="winButtons">
            <div className="winBtn" title="Minimize" />
            <div className="winBtn" title="Maximize" />
            <div className="winBtn close" title="Close" />
          </div>
        </div>

        <div className="winBody">
          <div className="winRow">
            <div className="winBadge">🔒</div>
            <div>
              <div className="winHeadline">This application is private.</div>
              <div className="winSub">Only the prettiest girl can enter.</div>
            </div>
          </div>

          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Moon"
            onKeyDown={(e) => e.key === "Enter" && unlock()}
            autoFocus
          />

          {err && <div className="error">{err}</div>}

          <div className="actions">
            <button className="btn ghost" onClick={() => setPwd("")}>Clear</button>
            <button className="btn" onClick={unlock}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}
