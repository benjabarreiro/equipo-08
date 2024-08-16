import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import FormGroup from "../components/FormComponents/FormGroup";
import Input from "../components/FormComponents/Input";
import Select from "../components/FormComponents/Select";
import LoadingModal from "../components/LoadingModal";
import { ToastContainer, toast } from "react-toastify";

const initialCityState = {
  cityName: "",
  latitud: "",
  longitud: "",
  country: {
    idCountry: "",
  },
  province: {
    idProvince: "",
  },
};

export default function ManageCities() {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(initialCityState);
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCityForm = (value, name) => {
    if (name === "country") {
      setCity((prev) => ({ ...prev, country: { idCountry: Number(value) } }));
    } else if (name === "province") {
      setCity((prev) => ({
        ...prev,
        province: { idProvince: Number(value) },
      }));
    } else {
      setCity((prev) => ({ ...prev, [name]: value }));
    }
  };

  const deleteCityHandler = async (idCity) => {
    try {
      setIsLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/city/delete/${idCity}`
      );
      toast.success("Éxito eliminando la ciudad");
    } catch (err) {
      toast.error("Hubo un error eliminando la ciudad");
      console.log("error", err);
    } finally {
      setIsLoading(false);
    }
  };

  const editCityHandler = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        `${import.meta.env.VITE_API_URL}/city/${city.idCity}`,
        city,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("yoda")}`,
          },
        }
      );
      toast.success("Éxito editando la ciudad");
    } catch (err) {
      toast.error("Hubo un error editando la ciudad");
      console.log("error", err);
    } finally {
      setIsLoading(false);
      setIsEdit(false);
      setCity(initialCityState);
    }
  };

  const createCityHandler = async () => {
    try {
      setIsLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/city`, city, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("yoda")}`,
        },
      });
      toast.success("Éxito creando la ciudad");
    } catch (err) {
      toast.error("Hubo un error creando la ciudad");
      console.log("error", err);
    } finally {
      setIsLoading(false);
      setCity(initialCityState);
    }
  };

  const fetchCities = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/city`);
      setCities(data);
      toast.success("Éxito buscando las ciudades");
    } catch (err) {
      toast.error("Hubo un error buscando las ciudades");
      console.log("error", err);
    }
  };

  const fetchProvinces = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/province`
      );
      setProvinces(data);
      toast.success("Éxito buscando las provincias");
    } catch (err) {
      toast.error("Hubo un error buscando las provincias");
      console.log(err);
    }
  };

  const fetchCountries = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/country`
      );
      setCountries(data);
      toast.success("Éxito buscando los países");
    } catch (err) {
      toast.error("Hubo un error buscando los países");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (!isLoading) fetchCities();
  }, [isLoading]);

  const formHandler = (e) => {
    e.preventDefault();
    if (isEdit) editCityHandler();
    else createCityHandler();
  };

  const resetFormHandler = () => {
    if (isEdit) setIsEdit(false);
    setCity(initialCityState);
  };

  return (
    <>
      <LoadingModal isLoading={isLoading} />
      <div className="main-addproduct" style={{ padding: "40px 0 10px" }}>
        <h1 style={{ marginBottom: "10px" }}>Panel de administrador</h1>
        <Button
          action={() => navigate("/admin")}
          text="Ir al panel"
          className="btn btn-primary"
        />
        <div>
          {cities && cities.length ? (
            cities.map((item) => (
              <div key={item.idCity} style={{ textAlign: "center" }}>
                <h4 style={{ color: "white", margin: "20px 0 10px" }}>
                  {item.cityName} - {item.province.provinceName} -{" "}
                  {item.country.countryName}
                </h4>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Button
                    action={() => {
                      setIsEdit(true);
                      setCity({
                        ...item,
                        province: { idProvince: item.province.idProvince },
                        country: { idCountry: item.country.idCountry },
                      });
                    }}
                    text="Editar"
                    className="btn btn-secondary"
                  />
                  <Button
                    action={() => deleteCityHandler(item.idCity)}
                    text="Eliminar"
                    className="btn btn-primary"
                  />
                </div>
              </div>
            ))
          ) : (
            <h2>Cargando...</h2>
          )}
        </div>
        <form onSubmit={formHandler}>
          <FormGroup>
            <Input
              label="Nombre de la ciudad"
              id="ciudad"
              value={city.cityName}
              handler={handleCityForm}
              name="cityName"
            />
          </FormGroup>
          <FormGroup>
            <Input
              label="Ingrese la latitud"
              id="latitud"
              value={city.latitud}
              handler={handleCityForm}
              name="latitud"
            />
            <Input
              label="Ingrese la longitud"
              id="longitud"
              value={city.longitud}
              handler={handleCityForm}
              name="longitud"
            />
          </FormGroup>
          <FormGroup>
            <Select
              label="Seleccione un país"
              id="pais"
              handler={(e) => handleCityForm(e.target.value, e.target.name)}
              name="country"
              value={city.country.idCountry}
            >
              <option>Seleccione un país</option>
              {countries &&
                countries.map((country) => (
                  <option key={country.idCountry} value={country.idCountry}>
                    {country.countryName}
                  </option>
                ))}
            </Select>
            <Select
              label="Seleccione una provincia"
              id="provincia"
              handler={(e) => handleCityForm(e.target.value, e.target.name)}
              name="province"
              value={city.province.idProvince}
            >
              <option>Seleccione una provincia</option>
              {provinces &&
                provinces.map((province) => (
                  <option key={province.idProvince} value={province.idProvince}>
                    {province.provinceName}
                  </option>
                ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <input
              onClick={resetFormHandler}
              type="reset"
              className="secondary-button"
            />
            <input
              type="submit"
              className="submit-button"
              value="Agregar ciudad"
            />
          </FormGroup>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}
