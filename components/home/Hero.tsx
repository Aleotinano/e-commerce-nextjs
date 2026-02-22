"use client";

import { Button, Card, CardBody } from "@heroui/react";
import { store } from "@/config.store";

export const Hero = () => {
  return (
    <section className="mx-auto w-full px-4 py-10 min-h-96 bg-background">
      <div className="max-w-6xl">
        <h1>Bienvenido a {store.name}</h1>
        <h2>{store.description} </h2>
      </div>
    </section>
  );
};
