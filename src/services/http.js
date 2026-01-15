const DEFAULT_TIMEOUT_MS = 0;

async function apiRequest(path, { method = "GET", body, headers, timeoutMs } = {}) {
  const base = import.meta.env.VITE_API_BASE_URL || "";
  const controller = new AbortController();

  const effectiveTimeout = timeoutMs ?? DEFAULT_TIMEOUT_MS;

  let t = null;
  if (effectiveTimeout && effectiveTimeout > 0) {
    t = setTimeout(() => controller.abort(), effectiveTimeout);
  }

  try {
    const res = await fetch(`${base}${path}`, {
      method,
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const msg = data?.error || data?.message || `Error HTTP ${res.status}`;
      throw new Error(msg);
    }

    return data;
  } catch (e) {
    if (String(e?.name) === "AbortError") {
      throw new Error("Tiempo de espera agotado consultando el servidor.");
    }
    throw e;
  } finally {
    if (t) clearTimeout(t);
  }
}

export const apiGet = (path, opts = {}) => apiRequest(path, { ...opts });

export const apiPost = (path, body, opts = {}) =>
  apiRequest(path, { method: "POST", body, ...opts });