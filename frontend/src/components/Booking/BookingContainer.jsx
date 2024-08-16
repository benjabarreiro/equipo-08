import React from "react";
import "./BookingContainer.css";
import PersonalDataForm from "./PersonalDataForm";
import BookingDetail from "./BookingDetail";
import DatePicker from "./DatePicker";

export default function BookingContainer() {
  return (
    <section className="booking-container">
      <div className="left-container">
        <PersonalDataForm />
        <DatePicker />
      </div>
      <BookingDetail />
    </section>
  );
}
