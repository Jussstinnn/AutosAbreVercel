/**
 * Cliente HTTP central para los servicios reales.
 * Maneja base URL, credentials, errores y resolución de imágenes.
 */

const RAW_BASE = import.meta.env.VITE_API_BASE_URL ?? "";
const BASE_URL = RAW_BASE.replace(/\/$/, "");

const CREDENTIALS: RequestCredentials =
  (import.meta.env.VITE_API_CREDENTIALS as RequestCredentials) ||
  (BASE_URL ? "same-origin" : "same-origin");

export class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body?: unknown,
  ) {
    super(`HTTP ${status} ${statusText}`);
  }
}

async function parseBody(res: Response): Promise<unknown> {
  const ct = res.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    try {
      return await res.json();
    } catch {
      return null;
    }
  }
  return await res.text();
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, { credentials: CREDENTIALS, ...init });
  if (!res.ok) {
    const body = await parseBody(res);
    throw new HttpError(res.status, res.statusText, body);
  }
  return (await parseBody(res)) as T;
}

export const httpClient = {
  get: <T>(path: string) => request<T>(path),
  postJson: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  postFormData: <T>(path: string, data: FormData) =>
    request<T>(path, { method: "POST", body: data }),
};

/**
 * Resuelve una URL de imagen. Si comienza con /uploads o /img y existe
 * VITE_API_BASE_URL, antepone el dominio del backend.
 */
export function resolveImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (/^https?:\/\//i.test(url) || url.startsWith("data:")) return url;
  if ((url.startsWith("/uploads") || url.startsWith("/img")) && BASE_URL) {
    return `${BASE_URL}${url}`;
  }
  return url;
}
