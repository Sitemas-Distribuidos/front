import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? children : <Navigate to="/join" />;
};

export default PrivateRoute;