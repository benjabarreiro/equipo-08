import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export const AdminProtectedRoutes = () => {
  const { isAdmin, isLoggedIn } = useContext(AuthContext);

  return isLoggedIn && isAdmin ? <Outlet /> : <Navigate to="/" />;
};
