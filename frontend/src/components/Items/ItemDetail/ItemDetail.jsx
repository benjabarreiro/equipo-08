import React from "react";
import "./ItemDetail.css";

export default function ItemDetail({
  model,
  imageUrl,
  vehicleType,
  pricePerDay,
  details,
}) {
  return (
    <section className="item-detail">
      <div className="item-detail-img">
        <img src={imageUrl} alt={model} />
      </div>
      <article className="detail-info">
        <div className="detail-top-container">
          <div>
            <h5>Tipo de vehículo: {vehicleType}</h5>
            <h4>Modelo: {model}</h4>
          </div>
          <div className="detail-score">
            <h5>Precio por día:</h5>
            <h4>${pricePerDay}</h4>
          </div>
        </div>
        <p>{details}</p>
      </article>
    </section>
  );
}
