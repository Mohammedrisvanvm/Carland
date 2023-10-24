export interface GeocodingResponse {
    data: {
      type: string;
      query: [number, number];
      features: Array<{
        id: string;
        type: string;
        place_type: string[];
        relevance: number;
        properties: {
          accuracy: string;
          mapbox_id?: string;
          wikidata?: string;
          short_code?: string;
        };
        text: string;
        place_name: string;
        center: [number, number];
        geometry: {
          type: string;
          coordinates: [number, number];
        };
        context: Array<{
          id: string;
          mapbox_id: string;
          text: string;
        }>;
      }>;
      attribution: string;
    };
    status: number;
    statusText: string;
    headers: {
      'cache-control': string;
      'content-type': string;
      'last-modified': string;
      'x-rate-limit-interval': string;
      'x-rate-limit-limit': string;
      'x-rate-limit-reset': string;
    };
    config: {
      adapter: string[];
      transformRequest: (() => void)[];
      transformResponse: (() => void)[];
      timeout: number;
      xsrfCookieName: string;
      xsrfHeaderName: string;
      maxContentLength: number;
      maxBodyLength: number;
      env?: {};
      headers: {
        Accept: string;
        'Content-Type': string | null;
      };
      baseURL: string;
      params: {
        access_token: string;
      };
      method: string;
      url: string;
      data: undefined;
    };
    request: {
      onreadystatechange: null;
      readyState: number;
      timeout: number;
      withCredentials: boolean;
      upload: {
        onloadstart: null;
        onprogress: null;
        onabort: null;
        onerror: null;
        onload: null;
        ontimeout: null;
        onloadend: null;
      };
      responseURL: string;
      status: number;
      statusText: string;
      responseType: string;
      response: string;
      responseText: string;
      responseXML: null;
      UNSENT: number;
      OPENED: number;
      HEADERS_RECEIVED: number;
      LOADING: number;
      DONE: number;
      onloadstart: null;
      onprogress: null;
      onload: null;
    };
  }
  