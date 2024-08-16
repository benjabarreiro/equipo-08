import React from "react";
import "./Category.css";
import { useNavigate } from "react-router-dom";

export default function Item({ idVehicleType, title, image, details }) {
  const navigate = useNavigate();

  const goToCategoryList = () => navigate(`/category/${idVehicleType}/${title}`);
  return (
    <li className="category-item" onClick={goToCategoryList}>
      <div className="category-img-container">
        <img className="category-img" src={image?.imageUrl} alt={title} />
      </div>
      <div className="category-info">
        <h4>{title}</h4>
      </div>
    </li>
  );
}
