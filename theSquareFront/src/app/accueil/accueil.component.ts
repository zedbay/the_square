import { Component, OnInit } from '@angular/core';
import { Entreprise } from '../shared/models/entreprise';
import { Personne } from '../shared/models/personne';
import { Emploi } from '../shared/models/emploi';

import { RandomModelsService } from '../shared/services/random-models.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  public entreprises: Entreprise[] = [];
  public personnes: Personne[] = [];
  public emplois: Emploi[] = [];
  public iam: Personne;

  constructor(private randomModels: RandomModelsService) { }

  ngOnInit() {
    this.iam = this.randomModels.getIam();
    this.personnes = this.randomModels.getRandomPersonne(1);
    this.entreprises = this.randomModels.getRandomEntreprise(2);
    this.emplois = this.randomModels.getRandomEmplois(3);
  }

}
