import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class NetworkService {

	public url: string = "http://localhost:8080";

	constructor(private httpClient: HttpClient) { }

	public post(route: string, body) {
		return this.httpClient.post(this.url + route, body);
	}
}
