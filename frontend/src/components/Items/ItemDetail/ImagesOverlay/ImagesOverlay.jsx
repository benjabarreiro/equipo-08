import React, { useEffect, useState } from "react";
import "./ImagesOverlay.css";
import Pagination from "../../../Pagination/Pagination";

export default function ImagesOverlay({ action, images }) {
  const [imageCounter, setImageCounter] = useState(1);
  const [secondaryImages, setSecondaryImages] = useState(images);

  const handleNextImageOrder = () => {
    const copy = [...secondaryImages];
    const firstImage = copy.shift();
    copy.push(firstImage);
    setSecondaryImages(copy);
  };
  //fix prev images
  const handlePrevImageOrder = () => {
    const copy = [...secondaryImages];
    const firstImage = copy.pop();
    copy.unshift(firstImage);
    setSecondaryImages(copy);
  };

  const handleNext = () => {
    if (imageCounter === 5) {
      setImageCounter(1);
      setSecondaryImages(images);
    } else {
      setImageCounter((prev) => prev + 1);
      handleNextImageOrder();
    }
  };
  const handlePrev = () => {
    if (imageCounter === 1) {
      setImageCounter(images.length);
      handlePrevImageOrder();
    } else {
      setImageCounter((prev) => prev - 1);
      handlePrevImageOrder();
    }
  };

  return (
    <div className="images-overlay">
      <article className="images-overlay-main-container">
        <div className="image-overlay-main">
          <img src={images[imageCounter - 1].imageUrl} alt="" />
        </div>
        <div>
          <Pagination
            goNext={handleNext}
            goBack={handlePrev}
            page={imageCounter}
            disabledBack={false}
          />
        </div>
        <div className="images-overlay-carousel">
          {secondaryImages &&
            secondaryImages
              .filter((_, idx) => idx !== 0)
              .map(({ imageUrl }, idx) => (
                <div key={idx} className="image-overlay-carousel">
                  <img src={imageUrl} alt="" />
                </div>
              ))}
        </div>
      </article>
    </div>
  );
}
