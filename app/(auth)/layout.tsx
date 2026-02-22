export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6">
      {children}
    </main>
  );
}
