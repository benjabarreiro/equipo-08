import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../../contexts/AuthContext";
import Button from "../../../../Button/Button";

export default function AdminActions() {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      <Button
        action={() => navigate("/admin")}
        text="Panel de administrador"
        className="btn btn-secondary btn-margin"
      />

      <Button
        action={handleLogout}
        text="Cerrar sesión"
        className="btn btn-primary"
      />
    </div>
  );
}
