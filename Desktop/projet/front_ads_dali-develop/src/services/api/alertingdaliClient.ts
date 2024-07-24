import { HttpClient } from "./httpClient";

const CHECK_OPTIN = "/checkOptIn";
const CHECK_FLOW = "/getFlowDali";
const CONTROLLER_ADS_DALI_FLOW =
  process.env.NEXT_PUBLIC_CONTROLLER_ADS_DALI_FLOW || "";

export class AlertingdaliClient extends HttpClient {
  constructor(baseUrl: string, headers: Headers) {
    super(baseUrl, headers);
  }

  async checkFlowByVerticalId(fk_vertical_id: string): Promise<any> {
    return await this.getWithParams(
      CONTROLLER_ADS_DALI_FLOW + CHECK_FLOW,
      `fk_vertical_id=${fk_vertical_id}`
    );
  }

  async checkOptinByVerticalId(fk_vertical_id: string): Promise<any> {
    return await this.getWithParams(
      CONTROLLER_ADS_DALI_FLOW + CHECK_OPTIN,
      `fk_vertical_id=${fk_vertical_id}`
    );
  }
}
