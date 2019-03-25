import { Component, OnInit } from '@angular/core';
import { PortailService } from '../../shared/services/portail.service';
import { NgForm } from '@angular/forms';
 
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  constructor(private portailService: PortailService) { }

  ngOnInit() {

  }

  public onSubmit(form: NgForm) {
    this.portailService.login(form.value);
  }

}
