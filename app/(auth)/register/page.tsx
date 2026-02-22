import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <section className="flex w-full flex-col gap-4">
      <h1 className="text-2xl font-semibold">Registrate</h1>
      <RegisterForm />
    </section>
  );
}
