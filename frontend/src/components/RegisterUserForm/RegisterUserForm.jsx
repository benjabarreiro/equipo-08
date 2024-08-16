import React, { useState, useEffect } from "react";
import FormGroup from "../FormComponents/FormGroup";
import Input from "../FormComponents/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../LoadingModal";

export default function RegisterUserForm() {
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [error, setError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const navigateLogin = () => navigate("/iniciar-sesion");

  const validateForm = () => {
    const errors = {};

    if (userName.length < 1 || !/^[a-zA-Z]+$/.test(userName)) {
      errors.userName =
        "El nombre no puede estar vacío y debe contener solo letras.";
    }

    if (userLastName.length < 1 || !/^[a-zA-Z]+$/.test(userLastName)) {
      errors.userLastName =
        "El apellido no puede estar vacío y debe contener solo letras.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      errors.userEmail = "El correo electrónico no es válido.";
    }

    if (userPassword.length < 6) {
      errors.userPassword = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (userPassword !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        // Redirigir al usuario después de 1 segundo
        navigate("/pantalla-confirmacion");
      }, 2000);
    }
  }, [successMessage, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError(true);
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/users/save`, {
        firstName: userName,
        lastName: userLastName,
        email: userEmail,
        password: userPassword,
      });

      // Manejar la respuesta exitosa

      setSuccessMessage(true);
    } catch (error) {
      // Manejar el error de la solicitud
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingModal isLoading={isLoading} />
      <form className="form" onSubmit={submitHandler}>
        <Input
          label="Nombre"
          id="nombre"
          handler={setUserName}
          value={userName}
          error={validationErrors.userName}
        />
        <Input
          label="Apellido"
          id="apellido"
          handler={setUserLastName}
          value={userLastName}
          error={validationErrors.userLastName}
        />
        <Input
          label="E-mail"
          id="email"
          handler={setUserEmail}
          value={userEmail}
          type="email"
          error={validationErrors.userEmail}
        />
        <Input
          label="Contraseña"
          id="password"
          handler={setUserPassword}
          value={userPassword}
          type="password"
          error={validationErrors.userPassword}
        />
        <Input
          label="Confirmar Contraseña"
          id="confirm-password"
          handler={setConfirmPassword}
          value={confirmPassword}
          type="password"
          error={validationErrors.confirmPassword}
        />

        <input
          style={{ marginTop: 30, alignSelf: "center" }}
          type="submit"
          className="btn btn-primary"
          value="Registrarme"
        />
        {successMessage && (
          <div className="success-message">Registro enviado con éxito.</div>
        )}
        {error && Object.keys(validationErrors).length > 0 && (
          <div className="error-message">
            <ul>
              <li>Hubo un error en el envío del formulario.</li>
              {Object.entries(validationErrors).map(([key, value], index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="secondary-cta">
          <p>
            ¿Ya tienes una cuenta?<b onClick={navigateLogin}> Iniciar sesión</b>
          </p>
        </div>
      </form>
    </>
  );
}
