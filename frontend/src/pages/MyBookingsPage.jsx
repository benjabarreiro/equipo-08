import React, { useContext, useEffect, useState } from "react";
import LoadingModal from "../components/LoadingModal";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import ItemList from "../components/Items/ItemList/ItemList";
import Pagination from "../components/Pagination/Pagination";
import usePagination from "../hooks/usePagination";

const MyBooking = ({
  vehicle: { model, vehiclePlate, idVehicle, imagesList },
  startDate,
  endDate,
}) => {
  const navigate = useNavigate();
  const goToDetail = () => navigate(`/detail/${idVehicle}`);
  return (
    <li style={{ marginBottom: "20px" }}>
      <div className="category-img-container">
        <img
          className="category-img"
          src={imagesList[0]?.imageUrl}
          alt={model}
        />
      </div>
      <h4 style={{ color: "white", marginBottom: "12px", marginTop: "12px" }}>
        Modelo: {model}
      </h4>
      <h4 style={{ color: "white", marginBottom: "12px" }}>
        Patente: {vehiclePlate}
      </h4>
      <p style={{ marginBottom: "12px" }}>
        Inicio: {startDate} - Fin: {endDate}
      </p>
      <Button
        className="btn btn-secondary"
        action={goToDetail}
        text="Ir al detalle"
      />
    </li>
  );
};

export default function MyBookingsPage() {
  const [myBookings, setMyBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { page, goBackHandler, goNextHandler } = usePagination();

  const fetchMyBookings = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/booking/findAllByUserId/${user.idUser}`
      );
      setMyBookings(data);
    } catch (err) {
      toast.error("Hubo un erros buscando tus reservas");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <ToastContainer position="bottom-right" />
      <LoadingModal isLoading={isLoading} />
      <h1>Mis reservas</h1>
      <ItemList
        empty={myBookings.length === 0}
        emptyMessage="No tienes reservas"
        items={myBookings[page - 1] || []}
        Component={MyBooking}
        className="item-list"
      />
      <Pagination
        goBack={goBackHandler}
        goNext={goNextHandler}
        page={page}
        disabledNext={page === myBookings.length}
        disabledBack={page === 1}
      />
    </div>
  );
}
