import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';

// import { TOKEN_KEY_NAVI } from "../app-config";
// import { ConfigService } from "./config.service";

@Injectable()
export class HttpService {
  private apiUrl: string;

  constructor(private http: Http) {
    // this.apiUrl = this.config.getConfig("api_url");
    this.apiUrl = "http://localhost:3000";
  }

  doGet(
    url: string,
    requestParams: string,
    addToken?: boolean
  ): Observable<any> {
    const requestOptions: RequestOptionsArgs = {
      responseType: ResponseContentType.Json,
      params: requestParams
    };

    if (addToken) {
      const token = this.getLoginToken();
      const headers = new Headers();
      headers.append("Authorization", token);
      headers.append("Content-Type", "application/json; charset=utf-8");
      requestOptions.headers = headers;
    }

    const reqUrl: string = this.apiUrl + url;

    return this.http.get(reqUrl, requestOptions);
  }

  doGetFile(
    url: string,
    requestParams: string,
    addToken?: boolean
  ): Observable<any> {
    const requestOptions: RequestOptionsArgs = {
      responseType: ResponseContentType.Blob,
      params: requestParams
    };

    if (addToken) {
      const token = this.getLoginToken();
      const headers = new Headers();
      headers.append("Authorization", token);
      headers.append("Content-Type", "application/json; charset=utf-8");
      requestOptions.headers = headers;
    }

    const reqUrl: string = this.apiUrl + url;

    return this.http.get(reqUrl, requestOptions);
  }

  doPost(url: string, bodyParams: any, addToken?: boolean): Observable<any> {
    const headers = new Headers({
      "Content-Type": "application/json; charset=utf-8"
    });

    if (addToken) {
      const token = this.getLoginToken();
      headers.append("Authorization", token);
    }

    const requestOptions: RequestOptionsArgs = {
      responseType: ResponseContentType.Json,
      headers: headers
    };
    const body: any = JSON.stringify(bodyParams);
    const reqUrl: string = this.apiUrl + url;

    return this.http.post(reqUrl, body, requestOptions);
  }

  doPostFile(url: string, file: File, addToken?: boolean): Observable<any> {
    const headers = new Headers({
      "Content-Type": "multipart/form-data",
      Accept: "application/json"
    });
    headers.append("enctype", "multipart/form-data");

    if (addToken) {
      const token = this.getLoginToken();
      headers.append("Authorization", token);
    }

    const requestOptions: RequestOptionsArgs = {
      responseType: ResponseContentType.Json,
      headers: headers
    };
    const formData = new FormData();
    formData.append(file.name, file);

    const reqUrl: string = this.apiUrl + url;

    return this.http.post(reqUrl, formData, requestOptions);
  }

  doPut(url: string, bodyParams: any, addToken?: boolean): Observable<any> {
    const headers = new Headers({
      "Content-Type": "application/json; charset=utf-8"
    });
    if (addToken) {
      const token = this.getLoginToken();
      headers.append("Authorization", token);
    }
    const requestOptions: RequestOptionsArgs = {
      responseType: ResponseContentType.Json,
      headers: headers
    };
    const body: any = JSON.stringify(bodyParams);
    const reqUrl: string = this.apiUrl + url;

    return this.http.put(reqUrl, body, requestOptions);
  }

  doDelete(
    url: string,
    requestParams: string,
    addToken?: boolean
  ): Observable<any> {
    const headers = new Headers({
      "Content-Type": "application/json; charset=utf-8"
    });
    if (addToken) {
      const token = this.getLoginToken();
      headers.append("Authorization", token);
    }
    const requestOptions: RequestOptionsArgs = {
      responseType: ResponseContentType.Text,
      params: requestParams,
      headers: headers
    };
    const reqUrl: string = this.apiUrl + url;

    return this.http.delete(reqUrl, requestOptions);
  }

  private getLoginToken(): string {
    // const token = localStorage.getItem(TOKEN_KEY_NAVI);

    return "Ytoken";
  }
}
