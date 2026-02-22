const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      data?.message || data?.error || "Error inesperado en la petición";

    throw new Error(message);
  }

  return data;
}
