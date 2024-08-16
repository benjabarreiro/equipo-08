import React, { useState } from "react";
import Input from "../components/FormComponents/Input";
import Button from "../components/Button/Button";
import axios from "axios";
import FormGroup from "../components/FormComponents/FormGroup";
import AddProductForm from "../components/AddProductForm/AddProductForm";
import { BarLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const [category, setCategory] = useState("");
  const [categoryImg, setCategoryImg] = useState(0);
  const [categoryDescription, setCategoryDescription] = useState("");
  const [renderVehicleType, setRenderVehicleType] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  const addCategoryHandler = async (e) => {
    e.preventDefault();

    if (category.trim() === "" || categoryDescription.trim() === "") {
      toast.error("Por favor, completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", categoryImg);

      const {
        data: { idImage },
      } = await axios.post(`${import.meta.env.VITE_API_URL}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("yoda")}`,
        },
      });

      await axios.post(
        `${import.meta.env.VITE_API_URL}/vehicleType`,
        {
          image: { idImage },
          title: category,
          details: categoryDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("yoda")}`,
          },
        }
      );
      setRenderVehicleType((prev) => !prev);
      setSuccessMessage("Categoría creada con éxito");
      setErrorMessage("");
      toast.success("Categoría creada con éxito", { autoClose: 3000 });
    } catch (err) {
      console.log("error", err);
      setErrorMessage("Error al crear la categoría");
      setSuccessMessage("");
      setHasError(true);
      toast.error("Error al crear la categoría", { autoClose: 3000 });
    }
    setLoading(false);
  };

  return (
    <div>
      <ToastContainer position="bottom-right" />
      <div className="main-addproduct" style={{ padding: "40px 0 10px" }}>
        <h1>Panel de administrador</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            action={() => navigate("/admin/manage-cities")}
            text="Gestionar ciudades"
            className="btn btn-secondary"
          />
          <Button
            action={() => navigate("/admin/manage-categories")}
            text="Gestionar categorías"
            className="btn btn-primary"
          />
        </div>
        <h2>
          <span>Crear categoría</span>
        </h2>
        <form className="form" onSubmit={addCategoryHandler}>
          <FormGroup>
            <Input
              label="Título de la categoría"
              id="titulo"
              value={category}
              handler={setCategory}
            />
            <Input
              label="Descripción"
              id="descripcion"
              value={categoryDescription}
              handler={setCategoryDescription}
            />
          </FormGroup>
          <div className="label-input">
            <label htmlFor="imagen">Imagen del vehículo (PNG o JPG)</label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              onChange={(e) => setCategoryImg(e.target.files[0])}
            />
          </div>
          <Button
            type="submit"
            text="Crear categoría"
            className="submit-button"
            disabled={loading}
          />

          {loading && (
            <div className="loading-container">
              <BarLoader color="#ffffff" loading={loading} />
            </div>
          )}
        </form>
      </div>
      <div className="main-addproduct" style={{ padding: "10px 0 40px" }}>
        <h2>
          <span>Crear producto</span>
        </h2>
        <AddProductForm
          isLoading={loading}
          setIsLoading={setLoading}
          renderVehicleType={renderVehicleType}
        />
      </div>
      {loading && (
        <div className="loading-container">
          <BarLoader color="#ffffff" loading={loading} />
        </div>
      )}
    </div>
  );
}
