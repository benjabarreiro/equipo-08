import React, { useEffect, useState } from "react";
import ItemList from "../components/Items/ItemList/ItemList";
import { useParams } from "react-router-dom";
import Item from "../components/Items/Item/Item";
import SearchForm from "../components/SearchForm/SearchForm";
import axios from "axios";
import Pagination from "../components/Pagination/Pagination";
import usePagination from "../hooks/usePagination";
import LoadingModal from "../components/LoadingModal";
import { ToastContainer, toast } from "react-toastify";

export default function CategoriesPage() {
  const { vehicleTypeId, vehicleTypeName } = useParams();
  const [categoryList, setCategoryList] = useState([]);
  const { page, goBackHandler, goNextHandler } = usePagination();
  const [empty, setEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategoryList = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/vehicle/category?vehicleTypeId=${vehicleTypeId}`
      );

      setCategoryList(data);

      if (data.length === 0) {
        setEmpty(true);
        toast.error("No hay vehículos para esta categoría");
      }
    } catch (err) {
      toast.error("Hubo un error buscando los vehículos");
      console.log("error", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, [page, vehicleTypeId]);

  return (
    <>
      <ToastContainer position="bottom-right" />
      <LoadingModal isLoading={isLoading} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <SearchForm />
        <ItemList
          title={`Tipo de vehículo: ${vehicleTypeName}`}
          items={categoryList[page - 1] || []}
          Component={Item}
          className="item-list list-grow"
          empty={empty}
          emptyMessage="No hay vehículos en esta categoría"
        />
        <Pagination
          page={page}
          goNext={goNextHandler}
          goBack={goBackHandler}
          disabledNext={categoryList.length === page}
          disabledBack={page === 1}
        />
      </div>
    </>
  );
}
