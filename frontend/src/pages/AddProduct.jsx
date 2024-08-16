import React from "react";
import "./AddProduct.css";
import AddProductForm from "../components/AddProductForm/AddProductForm";

export default function AddProduct() {
  return (
    <div className="main-addproduct">
      <h2>
        <span>Crear producto</span>
      </h2>
      <AddProductForm />
    </div>
  );
}
