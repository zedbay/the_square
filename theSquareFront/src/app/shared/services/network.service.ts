import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class NetworkService {
  public url: string = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  public post(route: string, body: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.url + route, body, { headers: headers });
  }

  public delete(route: string) {
    return this.httpClient.delete(this.url + route);
  }

  public get(route: string) {
    return this.httpClient.get(this.url + route);
  }
}
