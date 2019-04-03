import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class NetworkService {
  public url: string = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) { }

  private getHeader(): HttpHeaders {
    if (localStorage.getItem('token')) {
      return {};
    }
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return headers;
  }

  public post(route: string, body: any) {
    return this.httpClient.post(this.url + route, body, { headers: this.getHeader() });
  }

  public delete(route: string) {
    return this.httpClient.delete(this.url + route, { }, { headers: this.getHeader() });
  }

  public get(route: string) {
    return this.httpClient.get(this.url + route, { }, { headers: this.getHeader() });
  }
}
