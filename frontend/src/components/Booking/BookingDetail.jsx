import React, { useContext, useState } from "react";
import ProductDetailContext from "../../contexts/ProductDetailContext";
import Button from "../Button/Button";
import BookingContext from "../../contexts/BookingContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LoadingModal from "../LoadingModal";
import AuthContext from "../../contexts/AuthContext";

export default function BookingDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const { item, setItem } = useContext(ProductDetailContext);
  const { to, from, userData, setFrom, setTo, setDays } =
    useContext(BookingContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const totalPriceToPay = () => {
    let init = new Date(from);
    let end = new Date(to);

    let difference = end.getTime() - init.getTime();

    let days = Math.ceil(difference / (1000 * 60 * 60 * 24));

    return item.pricePerDay * days;
  };

  let showTotalPrice = (to && from && `$${totalPriceToPay()}`) || "-";

  const submitBooking = async () => {
    try {
      setIsLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/booking`,
        {
          startDate: from,
          endDate: to,
          vehicle: { idVehicle: item.idVehicle },
          userId: user.idUser,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("yoda")}`,
          },
        }
      );
      setFrom("");
      setTo("");
      setItem(null);
      setDays(null);
      localStorage.removeItem("product");
      navigate("/success-booking");
    } catch (err) {
      toast.error("Hubo un error al realizar la reserva");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" />
      <LoadingModal isLoading={isLoading} />
      <article className="right-container">
        <div>
          <h2
            className="booking-text booking-padding booking-detail-title"
            style={{ margin: "0", textAlign: "center" }}
          >
            Detalle de la reserva
          </h2>
          <div className="booking-img">
            <img src={item.imagesList[0].imageUrl} alt={item.model} />
          </div>
        </div>
        <div className="booking-detail-info">
          <h3 className="booking-text booking-model-title">
            Modelo: {item.model}
          </h3>
          <p className="booking-text">
            Tipo de vehículo: {item.vehicleType.title}
          </p>
          <p className="booking-text">Descripción: {item.details}</p>
          <p className="booking-text">Precio total: {showTotalPrice}</p>
          <p className="booking-text">
            Ubicación: {item.city.cityName}, {item.city.province.provinceName},{" "}
            {item.city.country.countryName}
          </p>
          <p className="booking-text">Características:</p>
          <ul>
            {item.characteristicsList.map((characteristic) => (
              <li key={characteristic.idCharacteristic}>
                {characteristic.title}
              </li>
            ))}
          </ul>
          <div className="divider" />
          <div className="booking-subcontainer">
            <p className="booking-text">Inicio de reserva</p>
            <p className="booking-text">{from || "-"}</p>
          </div>
          <div className="divider" />
          <div className="booking-subcontainer">
            <p className="booking-text">Fin de reserva</p>
            <p className="booking-text">{to || "-"}</p>
          </div>
          <div className="divider" />
          <Button
            text="Confirmar reserva"
            className="btn btn-primary full-width"
            action={submitBooking}
            disabled={!to || !from || !userData}
          />
        </div>
      </article>
    </>
  );
}
