/* ⚛ REACT */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

/* 📦 LIBS */
import { RouterProvider } from "react-router";

/* 🧩 COMPONENTS */
import Message from "./components/message";
import Modal from "./components/modal";

/* 🧠 CONTEXT */
import { MessageProvider } from "./context/MessageContext";
import { ModalProvider } from "./context/ModalContext";

/* 🧭 ROUTES */
import { router } from "./routes";

/* 🎨 STYLES */
import "./index.css";
import { Container } from "./styles/global";

/* SERVER */
import { initServerMonitor } from "./utils/loadBalancer";

// Inicializa o monitoramento antes de renderizar
initServerMonitor((server) => {
  console.log("Active server:", server);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MessageProvider>
      <ModalProvider>
        <Container>
          <Message />
          <RouterProvider router={router} />
          <Modal />
        </Container>
      </ModalProvider>
    </MessageProvider>
  </StrictMode>,
)
