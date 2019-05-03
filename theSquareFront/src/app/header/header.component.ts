import { Component, OnInit } from '@angular/core';
import { faShareAlt, IconDefinition, faHome, faSuitcase, faEnvelope, faUser, faChevronDown, faPowerOff, faSearch, faBell } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

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
  public faSearch: IconDefinition = faSearch;
  public valueOnOff: string;

  constructor(private router: Router) {
    this.valueOnOff = "Déconnexion";
  }

  ngOnInit() {
  }

  public onSubmit(value: string) {
    localStorage.setItem('recherche', value);
    this.router.navigate(['recherche']);
  };

  public getId(): string {
    return localStorage.getItem('id');
  }
}


