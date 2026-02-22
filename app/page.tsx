import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FiltersBar } from "@/components/home/FiltersBar";
import { SearchBar } from "@/components/home/SearchBar";
import Products from "@/components/home/Products";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FiltersBar />
      <SearchBar />
      <Products />
    </>
  );
}
