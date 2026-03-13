import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FiltersBar } from "@/components/home/FiltersBar";
import { Products } from "@/components/home/Products";
import { Pagination } from "@/components/home/Pagination";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FiltersBar />
      <Pagination />
      <Products />
    </>
  );
}
