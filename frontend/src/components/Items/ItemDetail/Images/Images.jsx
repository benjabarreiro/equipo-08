import React from "react";
import "./Images.css";

export default function Images({ action, images }) {
  const imgSubContainer = images.slice(1, 5);
  return (
    <article className="images-main-container">
      <div className="main-img">
        <img src={images[0].imageUrl} alt="" />
      </div>
      <div className="images-sub-container">
        {imgSubContainer.map(({ imageUrl }, idx) => (
          <div key={idx} className="image-sub-container">
            <img src={imageUrl} alt="" />
          </div>
        ))}
      </div>
      {
        <span onClick={action} className="show-all-images">
          Ver más
        </span>
      }
    </article>
  );
}
