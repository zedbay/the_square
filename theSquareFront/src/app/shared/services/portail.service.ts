import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PortailService {

	public url = "http://localhost:8080";

	constructor(private httpClient: HttpClient) { }

	public login(formValue: Object) {
		this.httpClient
			.post(this.url + '/login', formValue)
			.subscribe(
				(response) => {
					console.log(response);
				}
			);
	}

	public userIsCreateSubject = new Subject<boolean>();
	public createUser(formValue: Object) {
		this.httpClient
			.post(this.url + '/create/user', formValue)
			.subscribe(
				(response) => {
					this.userIsCreateSubject.next(response['success']);
				}
			)
		;
	}
}
