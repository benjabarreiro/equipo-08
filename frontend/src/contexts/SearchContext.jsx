import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [reRender, setReRender] = useState(false);

  const [showLocations, setShowLocations] = useState(false);
  const [renderCities, setRenderCities] = useState([]);

  const [selectCity, setSelectCity] = useState("");

  const [date, setDate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  const fetchCities = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/city`);
      setRenderCities(data);
    } catch (e) {
      console.log("error", e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSearchVehicles = async () => {
    let baseUrl = `${import.meta.env.VITE_API_URL}/vehicle`;
    let from = null;
    let to = null;
    let customUrl;
    if (date && date.length === 2) {
      from = `${date[0].year}-${date[0].month.number}-${date[0].day}`;
      to = `${date[1].year}-${date[1].month.number}-${date[1].day}`;
    }

    customUrl =
      selectCity && from && to
        ? `/filterByCityDate/${selectCity}?start=${from}&end=${to}`
        : !selectCity && from && to
        ? `/filterByDate?start=${from}&end=${to}`
        : `/filterByCityName/${selectCity}`;

    try {
      setIsLoadingSearch(true);
      const { data } = await axios.get(baseUrl + customUrl);
      setSearchResults(data);
      toast.success("Busqueda finalizada con éxito");
      if (!data.length)
        toast.error("La busqueda ingresada no contiene vehículos");
    } catch (err) {
      toast.error("Hubo un error al buscar vehículos");
      console.log(err);
    } finally {
      setIsLoadingSearch(false);
    }
  };
  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (searchIsActive) fetchSearchVehicles();
  }, [searchIsActive, reRender]);

  useEffect(() => {
    if ((!selectCity && !!date) || searchResults === 0) {
      setSearchIsActive(false);
    }
  }, [selectCity, date, searchResults]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchIsActive(true);
    setReRender((prev) => !prev);
  };

  return (
    <SearchContext.Provider
      value={{
        showLocations,
        setShowLocations,
        renderCities,
        date,
        setDate,
        selectCity,
        setSelectCity,
        searchResults,
        handleSearch,
        searchIsActive,
        setSearchIsActive,
        isLoading,
        isLoadingSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
