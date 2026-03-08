const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

interface APIError {
  error: string;
}

async function fetchClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include", // Always send cookies
  });

  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      window.location.href = "/login";
      return {} as T;
    }

    const errorData = (await response.json().catch(() => ({}))) as APIError;
    throw new Error(errorData.error || `HTTP Error ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return (await response.json()) as T;
}

export const api = {
  get: <T>(endpoint: string) => fetchClient<T>(endpoint, { method: "GET" }),

  post: <T>(endpoint: string, body?: unknown) =>
    fetchClient<T>(endpoint, { method: "POST", body: body ? JSON.stringify(body) : undefined }),

  put: <T>(endpoint: string, body: unknown) =>
    fetchClient<T>(endpoint, { method: "PUT", body: JSON.stringify(body) }),

  delete: <T>(endpoint: string) => fetchClient<T>(endpoint, { method: "DELETE" }),
};
