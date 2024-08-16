import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../components/LoadingModal";
import { ToastContainer, toast } from "react-toastify";

export default function ManageCategories() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const deleteVehicleTypeHandler = async (idVehicleType) => {
    try {
      setIsLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/vehicleType/delete/${idVehicleType}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("yoda")}`,
          },
        }
      );
      toast.success("Éxito eliminando el tipo de vehículo");
    } catch (err) {
      toast.error("Hubo un error eliminando el tipo de vehículo");
      console.log("error", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVehicleTypes = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/vehicleType`
      );
      setVehicleTypes(data);
      toast.success("Éxito buscando los tipos de vehículos");
    } catch (err) {
      toast.error("Hubo un error buscando los tipos de vehículos");
      console.log("error", err);
    }
  };

  useEffect(() => {
    if (!isLoading) fetchVehicleTypes();
  }, [isLoading]);

  return (
    <>
      <LoadingModal isLoading={isLoading} />
      <div className="main-addproduct" style={{ padding: "40px 0 10px" }}>
        <h1 style={{ marginBottom: "10px" }}>Panel de administrador</h1>
        <Button
          action={() => navigate("/admin")}
          text="Ir al panel"
          className="btn btn-primary"
        />
        <div>
          {vehicleTypes && vehicleTypes.length ? (
            vehicleTypes.map((vehicleType) => (
              <div
                key={vehicleType.idVehicleType}
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  margin: "20px 0 10px",
                }}
              >
                <h4 style={{ color: "white", margin: "0" }}>
                  {vehicleType.title}
                </h4>
                <Button
                  action={() =>
                    deleteVehicleTypeHandler(vehicleType.idVehicleType)
                  }
                  text="Eliminar"
                  className="btn btn-secondary"
                />
              </div>
            ))
          ) : (
            <h2>Cargando...</h2>
          )}
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}
