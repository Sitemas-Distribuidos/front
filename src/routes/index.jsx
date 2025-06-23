/* 📦 LIBS */
import { createBrowserRouter } from "react-router";

/* 🧩 COMPONENTS */
import Join from "../components/join";
import Register from "../components/register";
import Chat from "../components/chat";

export const router = createBrowserRouter([
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Chat />,
  }
]);