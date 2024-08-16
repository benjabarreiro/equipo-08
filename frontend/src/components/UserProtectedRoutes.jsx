import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export const UserProtectedRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? <Outlet /> : <Navigate to="/iniciar-sesion" />;
};
