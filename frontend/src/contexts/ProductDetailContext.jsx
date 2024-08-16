import React, { createContext, useState } from "react";

const ProductDetailContext = createContext(null);

const initialState = JSON.parse(localStorage.getItem("product")) || null;

export function ProductDetailProvider({ children }) {
  const [item, setItem] = useState(initialState);

  return (
    <ProductDetailContext.Provider value={{ item, setItem }}>
      {children}
    </ProductDetailContext.Provider>
  );
}

export default ProductDetailContext;
