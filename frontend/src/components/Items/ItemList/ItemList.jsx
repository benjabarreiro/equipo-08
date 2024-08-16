import React from "react";
import "./ItemList.css";
import { BeatLoader } from "react-spinners";

const RenderList = ({
  items,
  Component,
  className = "",
  loadingMessage,
  empty,
  emptyMessage,
}) => {
  if (empty) {
    return <h4 className="list-title">{emptyMessage}</h4>;
  }
  return items.length ? (
    <ul className={`list ${className}`}>
      {items.map((item, idx) => (
        <Component {...item} key={idx} />
      ))}
    </ul>
  ) : (
    <div className="loading-container">
      <BeatLoader color="#ffffff" loading={true} />
      <h4 className="list-title">{loadingMessage}</h4>
    </div>
  );
};

export default function ItemList({
  items,
  title = "",
  Component,
  className = "",
  loading = false,
  loadingMessage,
  empty = false,
  emptyMessage = "No se encontraron resultados para esta sección",
}) {
  return (
    <section className="list-container">
      {title && <h2 className="list-title">{title}</h2>}
      <RenderList
        items={items}
        Component={Component}
        className={className}
        loadingMessage={loadingMessage}
        empty={empty}
        emptyMessage={emptyMessage}
      />
    </section>
  );
}
