import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

type JsonSerializableBody =
  | string
  | FormData
  | URLSearchParams
  | Blob
  | ArrayBuffer
  | ArrayBufferView
  | ReadableStream<Uint8Array>
  | null
  | undefined
  | Record<string, unknown>
  | unknown[];

type ApiRequestOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: JsonSerializableBody;
  headers?: Record<string, string>;
};

export async function apiRequest<TResponse = unknown>(
  url: string,
  options: ApiRequestOptions = {},
): Promise<TResponse> {
  const { body, headers, ...restOptions } = options;

  const shouldSerializeBody =
    body !== undefined &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams) &&
    !(body instanceof Blob) &&
    !(body instanceof ArrayBuffer) &&
    !(ArrayBuffer.isView(body)) &&
    !(body instanceof ReadableStream) &&
    typeof body !== "string";

  const response = await fetch(url, {
    ...restOptions,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body:
      body === undefined
        ? undefined
        : shouldSerializeBody
        ? JSON.stringify(body)
        : (body as BodyInit),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = errorText;
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.error || errorText;
    } catch {
      // If parsing fails, use the text as is
    }
    throw new Error(errorMessage);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return (await response.json()) as TResponse;
  }

  return (await response.text()) as TResponse;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn = ({ on401: unauthorizedBehavior }: {
  on401: UnauthorizedBehavior;
}): QueryFunction<unknown> =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
