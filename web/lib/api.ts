const API_URL = process.env.NEXT_PUBLIC_API_URL

function getToken() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken()

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong")
  }

  return data
}

export const api = {
  get: (path: string) => request(path),
  post: (path: string, body?: unknown) =>
    request(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  put: (path: string, body?: unknown) =>
    request(path, { method: "PUT", body: body ? JSON.stringify(body) : undefined }),
  delete: (path: string, body?: unknown) =>
    request(path, { method: "DELETE", body: body ? JSON.stringify(body) : undefined }),
}