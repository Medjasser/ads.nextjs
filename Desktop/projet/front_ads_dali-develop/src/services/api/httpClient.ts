export abstract class HttpClient {
  private baseUrl: string;
  private headers: Headers;

  constructor(baseUrl: string, headers: Headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "GET",
      headers: this.headers,
      redirect: "follow",
    });
    return await response.json();
  }

  async getWithParams<T>(url: string, params: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}?${params}`, {
      method: "GET",
      headers: this.headers,
      redirect: "follow",
    });
    return await response.json();
  }

  async post<T>(url: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
      redirect: "follow",
    });
    return await response.json();
  }

  async put<T>(url: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(body),
      redirect: "follow",
    });
    return await response.json();
  }

  async delete<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "DELETE",
      headers: this.headers,
      redirect: "follow",
    });
    return await response.json();
  }
}
