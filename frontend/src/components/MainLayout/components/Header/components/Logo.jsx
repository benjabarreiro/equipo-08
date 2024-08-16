import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();

  const navigateHome = () => navigate("/");
  return (
    <div className="logo-container">
      <h2 className="logo" onClick={navigateHome}>
        <span>OFFROAD</span>
        <span>RENTALS</span>
      </h2>
    </div>
  );
}
