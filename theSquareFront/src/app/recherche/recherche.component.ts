import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from "@angular/forms";
import { IconDefinition, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NetworkService } from '../shared/services/network.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RechercheComponent implements OnInit {

  public faSearch: IconDefinition = faSearch;
  public currentSearch: string;
  public personResearch: any = [];
  public entrepriseResearch: any = [];
  public schoolResearch: any = [];
  public person: boolean = true;
  public entreprise: boolean = true;
  public school: boolean = true;


  constructor(private networkService: NetworkService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.currentSearch = localStorage.getItem('recherche');
  }

  public onSubmit(form: NgForm) {
    const tmp = form.value.recherche.split(' ');
    this.networkService.post('search', { first: tmp[0], second: tmp[1] }).subscribe(result => {
      this.currentSearch = form.value.recherche;
      this.personResearch = [];
      this.entrepriseResearch = [];
      this.schoolResearch = [];
      result["data"].forEach(element => {
        switch (element.labels[0]) {
          case "Entreprise":
            this.entrepriseResearch.push(element);
            break;
          case "School":
            this.schoolResearch.push(element);
            break;
          case "Person":
            this.personResearch.push(element);
            break;
          default:
            break;
        }
      });
    });
  }

}
