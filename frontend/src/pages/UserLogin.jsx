import React from 'react'
import "./AddProduct.css";
import LoginUserForm from "../components/LoginUserForm/LoginUserForm";

export default function UserLogin() {
  return (
    <div className="main-addproduct">
    <h2>
      <span>Iniciar sesión</span>
    </h2>
    <LoginUserForm />
  </div>
  );
}
