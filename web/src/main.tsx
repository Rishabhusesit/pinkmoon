import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";
import { AudioProvider } from "./audio/AudioProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AudioProvider defaultSrc="/music/default.mp3">
        <App />
      </AudioProvider>
    </BrowserRouter>
  </React.StrictMode>
);
