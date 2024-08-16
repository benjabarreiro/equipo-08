import React from 'react'
import "./AddProduct.css";
import RegisterUserForm from "../components/RegisterUserForm/RegisterUserForm";

export default function RegisterUser() {
  return (
    <div className="main-addproduct">
        <h2> <span>Regístrate</span></h2>
        <RegisterUserForm />
    </div>
  );
}
