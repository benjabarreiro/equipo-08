import React, { useContext, useEffect, useState } from "react";
import ItemList from "../components/Items/ItemList/ItemList";
import SearchForm from "../components/SearchForm/SearchForm";
import Category from "../components/Items/Category/Category";
import Item from "../components/Items/Item/Item";
import Pagination from "../components/Pagination/Pagination";
import usePagination from "../hooks/usePagination";
import HomeContext from "../contexts/HomeContext";
import SearchContext from "../contexts/SearchContext";
import LoadingModal from "../components/LoadingModal";
import { ToastContainer } from "react-toastify";
import Button from "../components/Button/Button";

export default function Home() {
  const [startIndex, setStartIndex] = useState(0);
  const { page, goBackHandler, goNextHandler } = usePagination();

  const {
    randomList,
    renderVehicleType,
    isLoading: isLoadingHome,
  } = useContext(HomeContext);
  const {
    searchResults,
    searchIsActive,
    isLoading,
    selectCity,
    date,
    isLoadingSearch,
  } = useContext(SearchContext);

  let from = null;
  let to = null;
  if (date && date.length === 2) {
    from = `${date[0].year}-${date[0].month.number}-${date[0].day}`;
    to = `${date[1].year}-${date[1].month.number}-${date[1].day}`;
  }

  let titleCity = (selectCity && selectCity.length && selectCity) || "";
  let titleFrom = (from && " - " + from + " - ") || "";
  let titleTo = (to && to) || "";

  const handleClickNext = () => {
    if (startIndex + 4 >= renderVehicleType.length) {
      setStartIndex(0);
    } else {
      setStartIndex(startIndex + 1);
    }
  };
  const handleClickPrev = () => {
    if (startIndex === 0) {
      setStartIndex(renderVehicleType.length - 4);
    } else {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" />
      <LoadingModal isLoading={isLoadingSearch} />
      <SearchForm />
      <ItemList
        title="Buscá por tipo de vehículo"
        items={renderVehicleType.slice(startIndex, startIndex + 4)}
        Component={Category}
        className="category-info"
      />
      <section
        className="list-container"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Button
          action={handleClickPrev}
          text="Atrás"
          className="btn btn-secondary"
        />
        <Button
          action={handleClickNext}
          text="Siguiente"
          className="btn btn-primary"
        />
      </section>
      {!searchIsActive ? (
        <ItemList
          title="Recomendaciones"
          items={randomList[page - 1] || []}
          Component={Item}
          className="item-list"
          loading={isLoadingHome}
          empty={!isLoadingHome && randomList && !randomList.length}
          emptyMessage="No se encontraron vehículos"
          loadingMessage="Cargando productos recomendados..."
        />
      ) : (
        <ItemList
          title={`Resultados para la busqueda: ${titleCity}${titleFrom}${titleTo}`}
          items={searchResults[page - 1] || []}
          Component={Item}
          className="item-list"
          loading={isLoading}
          empty={!isLoading && searchResults && !searchResults.length}
          emptyMessage="No se encontraron vehículos"
          loadingMessage="Cargando resultados de busqueda..."
        />
      )}
      <Pagination
        goBack={goBackHandler}
        goNext={goNextHandler}
        page={page}
        disabledNext={
          !searchIsActive
            ? page === randomList.length
            : page === searchResults.length
        }
        disabledBack={page === 1}
      />
    </>
  );
}
