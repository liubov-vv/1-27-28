type EndpointKey = "/users" | "/clients" | "/consultations";

type Registry = Record<EndpointKey, unknown[]>;

export class ApiClient {
  constructor(private readonly registry: Registry) {}

  async getList<T>(endpoint: EndpointKey): Promise<T[]> {
    const data = this.registry[endpoint];
    return Promise.resolve(data as T[]);
  }
}

