import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/fonts.css";
import "./styles/tokens.css";
import "./index.css";
import "./styles/base.css";
import "./styles/chrome.css";
import "./editorial.css";
import "./editorial-models.css";
import "./editorial-scenes.css";

createRoot(document.getElementById("root")!).render(<App />);
