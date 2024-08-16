import React, { useEffect, useState } from "react";
import FormGroup from "../FormComponents/FormGroup";
import Input from "../FormComponents/Input";
import Textarea from "../FormComponents/Textarea";
import Select from "../FormComponents/Select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function AddProductForm({
  renderVehicleType,
  isLoading,
  setIsLoading,
}) {
  const [type, setType] = useState("");
  const [brandModel, setbrandModel] = useState("");
  const [details, setDetails] = useState("");
  const [imgUrl, setImgUrl] = useState([]);
  const [cost, setCost] = useState(0);
  const [characteristics, setCharacteristics] = useState([]);
  const [vehicleCity, setVehicleCity] = useState(null);

  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicleCharacteristics, setVehicleCharacteristics] = useState([]);
  const [cities, setCities] = useState([]);

  const [error, setError] = useState(false);

  const fetchVehicleTypes = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/vehicleType`
      );

      setVehicleTypes(data);
    } catch (err) {
      console.log("error", err);
    }
  };
  const fetchVehicleCharacteristics = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/characteristic`
      );

      setVehicleCharacteristics(data);
    } catch (err) {
      console.log("error", err);
    }
  };
  const fetchCities = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/city`);
      setCities(data);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    fetchVehicleTypes();
  }, [renderVehicleType]);

  useEffect(() => {
    fetchVehicleCharacteristics();
    fetchCities();
  }, []);

  const handleImages = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const {
      data: { idImage },
    } = await axios.post(`${import.meta.env.VITE_API_URL}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("yoda")}`,
      },
    });
    setImgUrl((prev) => [...prev, { idImage }]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/vehicle`,
        {
          vehicleType: { idVehicleType: Number(type) },
          model: brandModel,
          details,
          imagesList: imgUrl,
          pricePerDay: Number(cost),
          characteristicsList: characteristics,
          city: { idCity: vehicleCity },
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("yoda")}`,
          },
        }
      );

      toast.success("Producto creado con éxito");
    } catch (err) {
      setError(true);
      toast.error("Error al crear el producto");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVehicleType = (e) => setType(e.target.value);

  const handleCharacteristics = (e) => {
    setCharacteristics((prev) => [
      ...prev,
      { idCharacteristic: Number(e.target.value) },
    ]);
  };

  const handleVehicleCity = (e) => setVehicleCity(e.target.value);

  return (
    <form onSubmit={submitHandler}>
      <FormGroup>
        <Select
          label="Tipo de vehículo"
          id="tipo-vehiculo"
          handler={handleVehicleType}
        >
          <option>Seleccione un tipo de vehículo</option>
          {vehicleTypes &&
            vehicleTypes.map((option) => (
              <option key={option.idVehicleType} value={option.idVehicleType}>
                {option.title}
              </option>
            ))}
        </Select>
        <Input
          label="Marca y modelo del vehículo"
          id="marca"
          handler={setbrandModel}
          value={brandModel}
        />
      </FormGroup>

      <FormGroup>
        <div className="label-input">
          <label htmlFor="imagen">Imagen del vehículo (PNG o JPG)</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleImages}
          />
        </div>

        <div className="label-input">
          <label htmlFor="costo-diario">Costo diario</label>
          <input
            id="costo-diario"
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
      </FormGroup>
      <FormGroup>
        <div className="label-input">
          <label htmlFor="imagen">Imagen del vehículo (PNG o JPG)</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleImages}
          />
        </div>
        <div className="label-input">
          <label htmlFor="imagen">Imagen del vehículo (PNG o JPG)</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleImages}
          />
        </div>
      </FormGroup>
      <FormGroup>
        <div className="label-input">
          <label htmlFor="imagen">Imagen del vehículo (PNG o JPG)</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleImages}
          />
        </div>
        <div className="label-input">
          <label htmlFor="imagen">Imagen del vehículo (PNG o JPG)</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleImages}
          />
        </div>
      </FormGroup>

      <div>
        <Textarea
          label="Descripción"
          id="descripcion"
          handler={setDetails}
          value={details}
        />
      </div>

      <FormGroup>
        <Select
          label="Ciudad del vehículo"
          id="ciudad-vehiculo"
          handler={handleVehicleCity}
        >
          <option>Seleccione una ciudad</option>
          {cities &&
            cities.map((option) => (
              <option key={option.idCity} value={option.idCity}>
                {option.cityName} - {option.province.provinceName} -{" "}
                {option.country.countryName}
              </option>
            ))}
        </Select>

        <Select
          label="Características del vehículo"
          id="caracteristicas-vehiculo"
          handler={handleCharacteristics}
          multiple={true}
        >
          {vehicleCharacteristics &&
            vehicleCharacteristics.map((option) => (
              <option
                key={option.idCharacteristic}
                value={option.idCharacteristic}
              >
                {option.title}
              </option>
            ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <input type="reset" className="secondary-button" />
        <input
          type="submit"
          className="submit-button"
          value="Agregar vehículo"
        />
      </FormGroup>

      {error && (
        <div className="error-message">
          <li>Hubo un error en el envio del formulario</li>
        </div>
      )}
    </form>
  );
}
