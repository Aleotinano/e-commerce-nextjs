import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <section className="flex w-full flex-col gap-4">
      <h1 className="text-2xl font-semibold">Inicia sesion</h1>
      <LoginForm />
    </section>
  );
}
