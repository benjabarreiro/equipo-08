import React, { useContext, useEffect } from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Menu from "../Menu/Menu";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../contexts/AuthContext";
import Logo from "./components/Logo";
import AdminActions from "./components/AdminActions";
import UserActions from "./components/UserActions";

export default function Header({ showMenu, mobile, setShowMenu }) {
  const { isAdmin, isLoggedIn } = useContext(AuthContext);
  const navList = [
    {
      text: "Crear cuenta",
      action: () => navigate("/registrar-usuario"),
      id: 1,
      className: "btn btn-primary",
    },
    {
      text: "Iniciar sesión",
      action: () => navigate("/iniciar-sesion"),
      id: 2,
      className: "btn btn-secondary",
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    if (!mobile && showMenu) {
      setShowMenu(false);
    }
  }, [mobile]);

  return (
    <header className="header">
      {showMenu ? (
        <Menu closeHandler={() => setShowMenu(false)} />
      ) : (
        <div className="container">
          <Logo />
          {mobile ? (
            <FontAwesomeIcon
              onClick={() => setShowMenu(true)}
              className="icon"
              icon={faBars}
            />
          ) : isAdmin && isLoggedIn ? (
            <AdminActions />
          ) : isLoggedIn && !isAdmin ? (
            <UserActions />
          ) : (
            <Navigation navList={navList} />
          )}
        </div>
      )}
    </header>
  );
}
