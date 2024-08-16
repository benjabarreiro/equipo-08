import React from "react";
import Button from "../Button/Button";
import "./Pagination.css";

export default function Pagination({
  goBack,
  goNext,
  page,
  disabledNext = false,
  disabledBack = true,
}) {
  return (
    <div className="pagination-container">
      <Button
        text="Anterior"
        action={goBack}
        className="btn btn-secondary"
        disabled={disabledBack}
      />
      <h4 className="page-counter">{page}</h4>
      <Button
        text="Siguiente"
        action={goNext}
        className="btn btn-primary"
        disabled={disabledNext}
      />
    </div>
  );
}
