import { Component, OnInit } from '@angular/core';
import { PortailService } from '../../shared/services/portail.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-inscription',
	templateUrl: './inscription.component.html',
	styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

	private userIsCreateSubs: Subscription;

	constructor(
		private portailService: PortailService, 
		private router: Router,
		private snackBar: MatSnackBar
	) { }

	ngOnInit() {
		this.userIsCreateSubs = this.portailService.userIsCreateSubject.subscribe((userIsCreate: boolean) => {
			userIsCreate ? this.onSuccess() : this.onFail();
		});
	}

	public onSubmit(form: NgForm) {
		this.portailService.createUser(form.value);
	}

	private onFail() {
		this.snackBar.open('Echec de l\'inscription', '', { duration: 3000, horizontalPosition: "right" });
	}

	private onSuccess() {
		this.router.navigate(['accueil']);
	}

}
