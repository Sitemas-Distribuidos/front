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
