import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Simple password check (for now)
// NOTE: client gate is just UX; this makes it "real-ish" since backend validates.
app.post("/api/unlock", (req, res) => {
  const { password } = req.body;
  const ok = password === (process.env.APP_PASSWORD || "Moon");
  res.json({ ok });
});

// AI placeholder (we'll wire later)
app.post("/api/ai", async (req, res) => {
  res.status(501).json({ error: "AI not wired yet" });
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
