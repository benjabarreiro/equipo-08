import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [days, setDays] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    if (user) {
      const { email, name, lastName } = user;
      setUserData({ ...userData, email, firstName: name, lastName });
    }
  }, [user]);

  useEffect(() => {
    if (days && days.from) {
      handleFromDate(days.from);
    }
    if (days && days.to) {
      handleToDate(days.to);
    }
  }, [days]);

  const handleUserData = (value, key) => {
    setUserData({ ...userData, [key]: value });
  };

  function parseDate(entry) {
    const dateObject = new Date(entry);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleFromDate = (date) => setFrom(parseDate(date));

  const handleToDate = (date) => setTo(parseDate(date));

  return (
    <BookingContext.Provider
      value={{
        userData,
        handleUserData,
        to,
        from,
        setTo,
        setFrom,
        days,
        setDays,
        bookedDates,
        setBookedDates,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
