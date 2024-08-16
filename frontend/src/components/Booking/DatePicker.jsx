import React, { useContext, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import ProductDetailContext from "../../contexts/ProductDetailContext";
import BookingContext from "../../contexts/BookingContext";
import axios from "axios";

export default function DatePicker() {
  const { item } = useContext(ProductDetailContext);
  const { days, setDays, bookedDates, setBookedDates } =
    useContext(BookingContext);

  const fetchBookedDates = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/booking/findAllByProductId/${
        item.idVehicle
      }`
    );
    const parseData = data.map((x) => ({
      from: new Date(x.startDate),
      to: new Date(x.endDate),
    }));
    setBookedDates(parseData);
  };

  useEffect(() => {
    fetchBookedDates();
  }, []);

  const disabledDates = (day) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (day <= tomorrow) {
      return true;
    }

    for (const range of bookedDates) {
      if (day >= range.from && day <= range.to) {
        return true;
      }
    }

    return false;
  };
  return (
    <article>
      <DayPicker
        numberOfMonths={2}
        mode="range"
        selected={days}
        onSelect={setDays}
        disabled={disabledDates}
      />
    </article>
  );
}
