import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Images from "../components/Items/ItemDetail/Images/Images";
import ImagesOverlay from "../components/Items/ItemDetail/ImagesOverlay/ImagesOverlay";
import axios from "axios";
import "./DetailPage.css";
import ProductDetailContext from "../contexts/ProductDetailContext";
import AuthContext from "../contexts/AuthContext";
import DatePicker from "../components/Booking/DatePicker";
import Button from "../components/Button/Button";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingModal from "../components/LoadingModal";
import { ToastContainer, toast } from "react-toastify";

export default function DetailPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [moreImages, setMoreImages] = useState(false);
  const { item, setItem } = useContext(ProductDetailContext);
  const { isLoggedIn, setIsBooking } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchVehicle = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/vehicle/${id}`
      );
      setItem({ ...data });
      localStorage.setItem("product", JSON.stringify(data));
    } catch (err) {
      toast.error("Hubo un error al cargar el producto");
      console.log("error", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (item === null || (item && item.idVehicle !== Number(id)))
      fetchVehicle();
  }, [id]);

  const showMoreImagesHandler = () => setMoreImages(true);

  const goToBooking = () => navigate("/booking");

  const goToLogin = () => {
    setIsBooking(true);
    navigate("/iniciar-sesion");
  };

  let fullLocation =
    item &&
    `${item.city.cityName}, ${item.city.province.provinceName}, ${item.city.country.countryName}`;

  let row = 0;
  let rowCol1 = 0;
  let rowCol2 = 0;
  let rowCol3 = 0;

  let emptyColumn1 =
    item &&
    !item.usagePoliciesList.includes(
      (policy) => policy.usagePolicyType === "NORMAS_DE_LA_CASA"
    );
  let emptyColumn2 =
    item &&
    !item.usagePoliciesList.includes(
      (policy) => policy.usagePolicyType === "SALUD_Y_SEGURIDAD"
    );
  let emptyColumn3 =
    item &&
    !item.usagePoliciesList.includes(
      (policy) => policy.usagePolicyType === "POLITICA_DE_CANCELACION"
    );

  return (
    <>
      <ToastContainer position="bottom-right" />
      <LoadingModal isLoading={isLoading} />
      {!isLoading && (item || (item && item.idVehicle === Number(id))) && (
        <section className="detail-container">
          {moreImages ? (
            <ImagesOverlay
              action={showMoreImagesHandler}
              images={item.imagesList}
            />
          ) : (
            <>
              <div>
                <p
                  className="item-detail-description"
                  style={{ marginTop: "8px" }}
                >
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ marginRight: "4px" }}
                  />
                  {fullLocation}
                </p>
              </div>
              <h1 className="item-detail-title">{item.model}</h1>
              <Images action={showMoreImagesHandler} images={item.imagesList} />
              <h3 className="item-detail-subtitle">Descripción del vehículo</h3>
              <p className="item-detail-description">{item.details}</p>
              <div>
                <h3 className="item-detail-subtitle">
                  ¿Qué ofrece este vehículo?
                </h3>
                <div className="item-detail-characteristic">
                  {item.characteristicsList.map(
                    ({ title, idCharacteristic }, idx) => (
                      <span key={idCharacteristic}>
                        {idx + 1} - {title}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div>
                <h3 className="item-detail-subtitle">¿Qué tenés que saber?</h3>
                <div className="politics-grid">
                  <h4>Normas del vehículo</h4>

                  <h4>Salúd y seguridad</h4>

                  <h4>Política de cancelación</h4>
                </div>
                <ul className="politics-grid politics-list">
                  <>
                    {emptyColumn1 && (
                      <li className="column-1" style={{ gridRow: 1 }}>
                        No hay politicas de uso para esta columna
                      </li>
                    )}
                    {emptyColumn2 && (
                      <li className="column-2" style={{ gridRow: 1 }}>
                        No hay politicas de uso para esta columna
                      </li>
                    )}
                    {emptyColumn3 && (
                      <li className="column-3" style={{ gridRow: 1 }}>
                        No hay politicas de uso para esta columna
                      </li>
                    )}
                    {item &&
                      item.usagePoliciesList.map((policy) => {
                        let columnClass = "";

                        if (policy.usagePolicyType === "NORMAS_DE_LA_CASA") {
                          columnClass = "column-1";
                          rowCol1++;
                          row = rowCol1;
                        } else if (
                          policy.usagePolicyType === "SALUD_Y_SEGURIDAD"
                        ) {
                          columnClass = "column-2";
                          rowCol2++;
                          row = rowCol2;
                        } else if (
                          policy.usagePolicyType === "POLITICA_DE_CANCELACION"
                        ) {
                          columnClass = "column-3";
                          rowCol3++;
                          row = rowCol3;
                        }
                        return (
                          <>
                            <li
                              key={policy.idUsagePolicy}
                              className={columnClass}
                              style={{ gridRow: row }}
                            >
                              {policy.description}
                            </li>
                          </>
                        );
                      })}
                  </>
                </ul>
              </div>
              <div className="date-container">
                <h2>Fechas disponibles</h2>
                <div className="date-sub-container">
                  <DatePicker />
                  <div className="date-action">
                    <h3 className="detail-date-cta-title">
                      Seleccioná las fechas para tu reserva
                    </h3>
                    <Button
                      text="Iniciá tu reserva"
                      className="btn btn-primary full-width"
                      action={isLoggedIn ? goToBooking : goToLogin}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}
