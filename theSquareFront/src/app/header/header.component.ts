import { Component, OnInit } from '@angular/core';
import { faShareAlt, IconDefinition, faHome, faSuitcase, faEnvelope, faUser, faChevronDown, faPowerOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public faShareAlt: IconDefinition = faShareAlt;
  public faHome: IconDefinition = faHome;
  public faSuitcase: IconDefinition = faSuitcase;
  public faEnvelope: IconDefinition = faEnvelope;
  public faUser: IconDefinition = faUser;
  public faChevronDown: IconDefinition = faChevronDown;
  public faPowerOff: IconDefinition = faPowerOff;

  public userIsLogged: boolean;
  public valueOnOff: string;

  constructor() {
    if (localStorage.getItem('token')) {
      this.userIsLogged = true;
      this.valueOnOff = "Déconnexion";
    } else {
      this.userIsLogged = false;
      this.valueOnOff = "Connexion";
    }
  }

  ngOnInit() {
  }

}
