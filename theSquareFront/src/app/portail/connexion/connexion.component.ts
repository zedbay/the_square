import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../shared/services/network.service';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-connexion',
	templateUrl: './connexion.component.html',
	styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

	constructor(private networkService: NetworkService) { }

	ngOnInit() { }

	public onSubmit(form: NgForm) {
		this.networkService.post('/login', form.value).subscribe((res) => {
			console.log(res);
		})
	}

}
