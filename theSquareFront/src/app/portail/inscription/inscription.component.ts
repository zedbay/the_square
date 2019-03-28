import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NetworkService } from '../../shared/services/network.service';

@Component({
	selector: 'app-inscription',
	templateUrl: './inscription.component.html',
	styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

	constructor(
		private router: Router,
		private snackBar: MatSnackBar,
		private networkService: NetworkService
	) { }

	ngOnInit() { }

	public onSubmit(form: NgForm) {
		this.networkService.post('/create/user', form.value).subscribe((res) => {
			res['success'] ? this.onSuccess() : this.onFail();
		});
	}

	private onFail() {
		this.snackBar.open('Echec de l\'inscription', '', { duration: 3000, horizontalPosition: "right" });
	}

	private onSuccess() {
		this.router.navigate(['accueil']);
	}

}
