"use client";

import { useContext } from "react";
import { CategoryContext } from "./Category";

export function useCategories() {
  const ctx = useContext(CategoryContext);
  if (!ctx) {
    throw new Error("useCategories debe usarse dentro de <CategoryProvider>");
  }
  return ctx;
}
