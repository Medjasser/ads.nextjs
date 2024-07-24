import { HttpClient } from "./httpClient";

const GET_ALL_VERTICALS = "/verticals";
const CONTROLLER_ADS_DALI = process.env.NEXT_PUBLIC_CONTROLLER_ADS_DALI || "";

export class VerticalClient extends HttpClient {
  constructor(baseUrl: string, headers: Headers) {
    super(baseUrl, headers);
  }

  async getAll(): Promise<any> {
    return await this.get(CONTROLLER_ADS_DALI + GET_ALL_VERTICALS);
  }
}
