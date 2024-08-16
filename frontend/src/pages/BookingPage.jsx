import React from "react";
import BookingContainer from "../components/Booking/BookingContainer";
import "./BookingPage.css";

function BookingPage() {
  return (
    <div className="booking-page-container">
      <h1>Finalizá tu reserva</h1>
      <BookingContainer />
    </div>
  );
}

export default BookingPage;
