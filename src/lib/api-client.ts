type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions extends Omit<RequestInit, "body" | "method"> {
  params?: Record<string, string>;
  body?: unknown;
}

interface ApiClientOptions {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
}

export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...options.defaultHeaders,
    };
  }

  private async request<T>(
    endpoint: string,
    method: RequestMethod,
    options: FetchOptions = {}
  ): Promise<T> {
    const { params, headers, body, ...rest } = options;

    // Construct URL with query parameters
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    // Merge default headers with provided headers
    const mergedHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };

    // Prepare the body based on its type
    let requestBody: BodyInit | null | undefined;

    if (
      body instanceof FormData ||
      body instanceof URLSearchParams ||
      body instanceof Blob ||
      body instanceof ArrayBuffer ||
      typeof body === "string"
    ) {
      requestBody = body as BodyInit;
    } else if (body !== undefined && body !== null) {
      requestBody = JSON.stringify(body);
    }

    // Make the request
    const response = await fetch(url.toString(), {
      method,
      headers: mergedHeaders,
      body: requestBody,
      ...rest,
    });

    // Handle failed responses
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "An unknown error occurred",
      }));

      throw new Error(error.message || `HTTP error ${response.status}`);
    }

    // Return the data if the response is successful
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      return response.json();
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.text() as unknown as T;
  }

  // HTTP method helpers
  public get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, "GET", options);
  }

  public post<T>(
    endpoint: string,
    data?: unknown,
    options?: FetchOptions
  ): Promise<T> {
    return this.request<T>(endpoint, "POST", { ...options, body: data });
  }

  public put<T>(
    endpoint: string,
    data?: unknown,
    options?: FetchOptions
  ): Promise<T> {
    return this.request<T>(endpoint, "PUT", { ...options, body: data });
  }

  public patch<T>(
    endpoint: string,
    data?: unknown,
    options?: FetchOptions
  ): Promise<T> {
    return this.request<T>(endpoint, "PATCH", { ...options, body: data });
  }

  public delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, "DELETE", options);
  }
}

// Create and export a default instance
export const apiClient = new ApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
});
