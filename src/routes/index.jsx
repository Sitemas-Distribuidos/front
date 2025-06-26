/* 📦 LIBS */
import { createBrowserRouter } from "react-router";

/* 🧩 COMPONENTS */
import Join from "../pages/join";
import Register from "../pages/register";
import Chat from "../pages/chat";

/* 🧭 ROUTEs */
import PrivateRoute from "./privateRoute";

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
    element: (
      <PrivateRoute>
        <Chat />
      </PrivateRoute>
    ),
  }
]);