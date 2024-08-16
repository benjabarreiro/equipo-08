import React, { useEffect, useRef } from "react";
import AuthContext from "../../../../../contexts/AuthContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserActions() {
  const { handleLogout, user } = useContext(AuthContext);
  const [showActions, setShowActions] = useState(false);

  const navigate = useNavigate();

  const handleUserInfo = () => setShowActions((prev) => !prev);

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowActions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const goToMyBookings = () => navigate("/my-bookings");
  return (
    <div
      className="user-info"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        cursor: "pointer",
        width: "fit-content",
      }}
      onClick={handleUserInfo}
      ref={dropdownRef}
    >
      <span
        style={{
          color: "white",
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          border: "1px solid white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="user-avatar"
      >
        {user.name[0] + user.lastName[0]}
      </span>
      <span style={{ color: "white", margin: "0 12px" }} className="user-name">
        Hola, {user.name}
      </span>
      <FontAwesomeIcon
        onClick={() => {
          // Lógica para cerrar sesión
        }}
        className="icon"
        icon={faSignOutAlt}
      />

      {showActions && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            background: "whitesmoke",
            padding: "10px 10px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "#31363F",
              paddingTop: "8px",
              borderBottom: "1px solid #31363F",
            }}
            onClick={goToMyBookings}
          >
            Mis reservas
          </span>
          <span
            style={{
              color: "#31363F",
              paddingTop: "12px",
              borderBottom: "1px solid #31363F",
            }}
            onClick={handleLogout}
          >
            Cerrar sesión
          </span>
        </div>
      )}
    </div>
  );
}
