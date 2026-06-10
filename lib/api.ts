export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  params?: Record<string, string | number | undefined>;
  timeout?: number;
};

function buildUrl(path: string, params?: Record<string, string | number | undefined>): string {
  if (!params) return path;
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      searchParams.set(key, String(value));
    }
  }
  const qs = searchParams.toString();
  return qs ? `${path}?${qs}` : path;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, params, timeout = 15000 } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(buildUrl(path, params), {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    if (res.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new ApiError('Não autorizado. Redirecionando para login.', 401);
    }

    let json: any = null;
    try {
      json = await res.json();
    } catch {
      // Response is not JSON (e.g., HTML error page from Next.js 500)
      if (!res.ok) {
        throw new ApiError(
          `Erro ${res.status} do servidor. Tente novamente.`,
          res.status,
        );
      }
      throw new ApiError('Resposta inesperada do servidor.', res.status);
    }

    if (!res.ok) {
      throw new ApiError(
        json?.error || `Erro ${res.status}`,
        res.status,
        json?.details,
      );
    }

    return json as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ApiError('Requisição excedeu o tempo limite.', 408);
    }
    throw new ApiError('Erro de conexão. Verifique sua rede.', 0);
  } finally {
    clearTimeout(timeoutId);
  }
}
