import React, { useContext, useState } from "react";
import Input from "../FormComponents/Input";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import LoadingModal from "../LoadingModal";

export default function LoginUserForm() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [error, setError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { handleLogin, isBooking, setIsBooking } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const navigateSignIn = () => navigate("/registrar-usuario");

  const validateForm = () => {
    const errors = {};

    if (userEmail.length < 1 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      errors.userEmail = "El correo electrónico no es válido.";
    }

    if (userPassword.length < 6) {
      errors.userPassword = "La contraseña debe tener al menos 6 caracteres.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;

    // const renderValidationErrors = errors.map((error) => <li>{error}</li>);
  };

  const navigateSuccessLogin = () => {
    if (isBooking) {
      setIsBooking(false);
      navigate("/booking");
    } else {
      navigate("/");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError(true);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          username: userEmail,
          password: userPassword,
        }
      );
      // Manejar inicio de sesión exitoso
      setSuccessMessage(true);
      sessionStorage.setItem("yoda", response.data.token);
      await handleLogin(userEmail);

      navigateSuccessLogin();
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
          label="E-mail"
          id="email"
          handler={setUserEmail}
          value={userEmail}
          type="email"
          error={validationErrors.userEmail}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          handler={setUserPassword}
          value={userPassword}
          error={validationErrors.userPassword}
        />

        <input
          style={{ marginTop: 30, alignSelf: "center" }}
          type="submit"
          className="btn btn-primary"
          value="Iniciar sesión"
        />
        {successMessage && (
          <div className="success-message">Inicio de sesión correcto.</div>
        )}

        {error && Object.keys(validationErrors).length > 0 && (
          <div className="error-message">
            <ul>
              {Object.entries(validationErrors).map(([key, value], index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="secondary-cta">
          <p>
            ¿No tienes una cuenta?
            <b onClick={navigateSignIn}> Regístrate ahora</b>
          </p>
        </div>
      </form>
    </>
  );
}
