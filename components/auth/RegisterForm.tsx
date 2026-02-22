"use client";

import { useForm } from "react-hook-form";
import { authService } from "@/services/auth.service";
import { RegisterInput } from "@/types/auth";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterInput>();

  const onSubmit = async (data: RegisterInput) => {
    try {
      const res = await authService.register(data);
      console.log(res.message);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 rounded-md bg-amber-600 p-4"
    >
      <input {...register("username")} placeholder="Username" />
      <input {...register("email")} placeholder="Email" />
      <input {...register("password")} type="password" placeholder="Password" />
      <button disabled={isSubmitting}>
        {isSubmitting ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
};
