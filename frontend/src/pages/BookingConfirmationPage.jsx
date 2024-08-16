import React from "react";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function BookingConfirmationPage() {
  const navigate = useNavigate();

  const goHome = () => navigate("/");
  return (
    <div className="centrado">
      <h1>Reserva exitosa</h1>
      <p>Gracias por reservar. Tu reserva ha sido procesada correctamente.</p>
      <Button text="Ir a inicio" className="btn btn-primary" action={goHome} />
    </div>
  );
}
