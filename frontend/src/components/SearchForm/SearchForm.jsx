import React, { useContext, useEffect, useRef } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "../Input/Input.css";
import "./SearchForm.css";
import DatePicker from "react-multi-date-picker";
import "../Button/Button.css";
import SearchContext from "../../contexts/SearchContext";

export default function SearchForm() {
  const {
    showLocations,
    setShowLocations,
    renderCities,
    date,
    setDate,
    selectCity,
    setSelectCity,
    handleSearch,
  } = useContext(SearchContext);

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowLocations(false);
    }
  };

  const handleScroll = () => {
    setShowLocations(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);

  return (
    <div className="search-container">
      <h3 className="search-container__title">
        Solo viajar no es suficiente para vos.
      </h3>
      <form className="search-container__form" onSubmit={handleSearch}>
        <div className="input-wrapper">
          <Input
            name="location"
            value={selectCity}
            onChange={(e) => {
              setSelectCity(e.target.value);
            }}
            onClick={() => setShowLocations(true)}
            placeholder="Desde dónde inicia tu aventura..."
            className="input location"
          />
          <div className="input-options-container" ref={dropdownRef}>
            {showLocations && (
              <ul className="input-options">
                {renderCities
                  .filter((city) => {
                    let fullString = `${city.cityName}${
                      city.province ? ", " + city.province.provinceName : ""
                    }${city.country ? " - " + city.country.countryName : ""}`;
                    return fullString.includes(selectCity);
                  })
                  .map((city) => (
                    <li
                      key={city.idCity}
                      onClick={() => {
                        setShowLocations(false);
                        setSelectCity(city.cityName);
                      }}
                    >
                      {`${city.cityName}${
                        city.province ? ", " + city.province.provinceName : ""
                      }${city.country ? " - " + city.country.countryName : ""}`}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
        <div className="input-wrapper">
          <DatePicker
            className="yellow bg-dark"
            value={date}
            numberOfMonths={2}
            range
            onChange={setDate}
            placeholder="Seleccione un rango de fechas"
            style={{
              width: "300px",
              border: "none",
              borderRadius: "8px",
              height: "36px",
              padding: "0 22px",
              alignSelf: "left",
              margin: "18px",
            }}
            hideOnScroll={true}
            minDate={tomorrow}
          />
        </div>
        <div className="input-wrapper">
          <Button type="submit " text="Buscar" className="btn btn-tertiary" />
        </div>
      </form>
    </div>
  );
}
