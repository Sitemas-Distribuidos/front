import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WebSocketProvider } from "./api/context/WebSocketProvider";
import "./index.css";
import Home from "./pages/home";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WebSocketProvider>
      <Home/>
    </WebSocketProvider>
  </StrictMode>,
)
