"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { authService } from "@/services/auth.service";
import { LoginInput } from "@/types/auth";
import { useAuth } from "@/context/useAuth";

export const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const onSubmit = async (data: LoginInput) => {
    try {
      const res = await authService.login(data);
      if (!res?.usuario) return;

      setUser(res.usuario);
      router.replace("/");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginInput>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 rounded-md bg-amber-500 p-4"
    >
      <input {...register("username")} placeholder="Username" />
      <input {...register("password")} type="password" placeholder="Password" />
      <button disabled={isSubmitting}>
        {isSubmitting ? "Iniciando sesion..." : "Iniciar sesion"}
      </button>
    </form>
  );
};
