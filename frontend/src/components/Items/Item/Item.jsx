import React, { useContext } from "react";
import "./Item.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../../contexts/AuthContext";

export default function Item({
  model,
  imagesList,
  vehicleType,
  pricePerDay,
  details,
  idVehicle,
  city: { cityName },
}) {
  const { isAdmin, isLoggedIn } = useContext(AuthContext);
  const maxWordsToShow = 18;
  const truncatedDetails = details
    .split(" ")
    .slice(0, maxWordsToShow)
    .join(" ");
  const isTruncated = details.split(" ").length > maxWordsToShow;

  const navigate = useNavigate();

  const navigateToDetail = () => navigate(`/detail/${idVehicle}`);

  let image =
    imagesList && imagesList[0]
      ? imagesList[0].imageUrl
      : "https://offroadrentals-images-e8-c7.s3.us-east-2.amazonaws.com/1685121022519_sidecar.jpeg";

  return (
    <li className="item" onClick={navigateToDetail}>
      {isLoggedIn && (
        <div className="icon-container">
          <FontAwesomeIcon icon={faHeart} className="favorite-icon" />
          {isAdmin && (
            <FontAwesomeIcon icon={faTrash} className="delete-icon" />
          )}
        </div>
      )}
      <div className="item-img">
        <img src={image} alt={model} />
      </div>
      <article className="item-info">
        <div>
          <div className="item-top-container">
            <div className="card-title">
              {vehicleType && <h5>{vehicleType.title}</h5>}
              <h4 style={{ margin: "0" }}>{model}</h4>
            </div>
            <div className="card-price">
              <h5>Precio por día</h5>
              <h4 style={{ margin: "0" }}>${pricePerDay}</h4>
            </div>
          </div>
          <h4 style={{ margin: "0" }}>Ciudad: {cityName}</h4>
        </div>
        <div className="details">
          {truncatedDetails}
          {isTruncated && (
            <span className="secondary-cta">
              ... <b>ver más</b>
            </span>
          )}
        </div>
      </article>
    </li>
  );
}
