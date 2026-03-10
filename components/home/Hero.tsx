"use client";

import { store } from "@/config.store";
import { Button } from "@heroui/react";
import Link from "next/link";

const IMG_1 =
  "https://instagram.feze8-1.fna.fbcdn.net/v/t51.29350-15/341533092_1373663213481595_1410909193316154001_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=MzA4MzMxNjcxMzk4NzEzNzk4NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc3OS5zZHIuZGVmYXVsdF9pbWFnZS5DMyJ9&_nc_ohc=SSFMR-XPRgQQ7kNvwFqrhgD&_nc_oc=AdncKGgXNEKmHD8mQje8B2WC25SADsvTHFZ-bsd0gewmBiC5DQ0jAwsVx9qwb3t3JxY&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.feze8-1.fna&_nc_gid=eWs2_533Wjc8IrcoXIHvEg&_nc_ss=8&oh=00_AfyN6-qjBiLcCJUrv2vlvpp7k2W3GiNQgaHXM05irJ5pBg&oe=69B14850";
const IMG_2 =
  "https://instagram.feze8-1.fna.fbcdn.net/v/t51.29350-15/348992119_262535862968046_7863867545795805416_n.jpg?stp=dst-jpg_e35_p1080x1080_tt6&_nc_cat=103&ig_cache_key=MzExMDEwNTUyNjM1MjUzNDgwNQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuZGVmYXVsdF9pbWFnZS5DMyJ9&_nc_ohc=CE1_haaKEiAQ7kNvwHNq6jQ&_nc_oc=Adl2pVFn4rQOEa0I73v5lJ2kxkB0hZBVTIce3RcGlJNnVMCaoJf28mzCZpB8FHltYZ0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.feze8-1.fna&_nc_gid=1cLvChs0yb5f48FNrUptFA&_nc_ss=8&oh=00_AfxK7X2m7t3sCCbTP8kelK3xsFxoG2eKqF_iIqLukfejQg&oe=69B1618F";

export const Hero = () => {
  return (
    <section className="relative flex max-sm:min-h-[50vh] min-h-[80vh] items-center pt-16">
      <div className="absolute inset-0 flex overflow-hidden">
        <div className="relative flex-1">
          <img
            src={IMG_1}
            alt=""
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className="relative flex-1">
          <img
            src={IMG_2}
            alt=""
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-fit px-4 flex flex-col items-center gap-10 mb-50">
        <h1 className="max-sm:text-4xl max-md:text-5xl max-lg:text-6xl text-8xl font-bold tracking-tighter">
          {store.name}
        </h1>
        <div>
          <p className="text-base max-md:text-sm uppercase tracking-widest text-center font-medium">
            {store.description}
          </p>
        </div>

        <Button
          as={Link}
          href="#productos"
          color="primary"
          variant="solid"
          size="lg"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("productos")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Ver productos
        </Button>
      </div>
    </section>
  );
};
