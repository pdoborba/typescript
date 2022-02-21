import {
  HttpPostParams,
  HttpResponse,
  HttpPostClient,
} from '@/data/protocols/http/index.http.data';
import axios, { AxiosResponse } from 'axios';
export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>;
    try {
      const httpResponse = await axios.post(params.url, params.body);
      return {
        statusCode: httpResponse.status,
        body: httpResponse.data,
      };
    } catch (error) {
      httpResponse = error.response;
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
