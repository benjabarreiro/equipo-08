import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../contexts/AuthContext";

export default function useMenuActions() {
  const { handleLogout, isAdmin, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const navList = [
    {
      text: "Crear cuenta",
      action: () => navigate("/registrar-usuario"),
      id: 1,
      className: "btn btn-mobile",
    },
    {
      id: 2,
      divider: true,
      className: "",
    },
    {
      text: "Iniciar sesión",
      action: () => navigate("/iniciar-sesión"),
      id: 3,
      className: "btn btn-mobile",
    },
  ];

  const adminList = [
    {
      text: "Panel de administrador",
      action: () => navigate("/admin"),
      id: 1,
      className: "btn btn-mobile",
    },
    {
      id: 2,
      divider: true,
      className: "",
    },
    {
      text: "Cerrar sesión",
      action: handleLogout,
      id: 3,
      className: "btn btn-mobile",
    },
  ];

  const nonAdminList = [
    {
      text: "Tu perfíl",
      action: () => null,
      id: 1,
      className: "btn btn-mobile",
    },
    {
      id: 2,
      divider: true,
      className: "",
    },
    {
      text: "Cerrar sesión",
      action: handleLogout,
      id: 3,
      className: "btn btn-mobile",
    },
  ];

  const showList =
    isAdmin && isLoggedIn
      ? adminList
      : isLoggedIn && !isAdmin
      ? nonAdminList
      : navList;
  return {
    showList,
  };
}
