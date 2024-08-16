import { createContext, useEffect, useState } from "react";
import axios from "axios";

const HomeContext = createContext(null);

export const HomeProvider = ({ children }) => {
  const [randomList, setRandomList] = useState([]);
  const [renderVehicleType, setRenderVehicleType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchRandomList = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/vehicle/random-list`
      );
      setRandomList(data);
    } catch (e) {
      console.log("error", e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRenderVehicleType = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/vehicleType`
      );
      setRenderVehicleType(data);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchRandomList();
    fetchRenderVehicleType();
  }, []);
  return (
    <HomeContext.Provider value={{ randomList, renderVehicleType, isLoading }}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContext;
