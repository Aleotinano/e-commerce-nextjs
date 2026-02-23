"use client";

import { useContext } from "react";
import { ProductContext } from "./Product";

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error("useProducts debe usarse dentro de <ProductProvider>");
  }
  return ctx;
}
