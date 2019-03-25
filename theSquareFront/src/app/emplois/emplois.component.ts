import { Component, OnInit } from '@angular/core';
import { Personne } from '../shared/models/personne';
import { Emploi } from '../shared/models/emploi';
import { Competence } from '../shared/models/competence';
import { Domaine } from '../shared/models/domaine';
import { faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { RandomModelsService } from '../shared/services/random-models.service';

@Component({
  selector: 'app-emplois',
  templateUrl: './emplois.component.html',
  styleUrls: ['./emplois.component.scss']
})
export class EmploisComponent implements OnInit {

  public iam = new Personne('Antoine Heurtault', 'Dévelopeur front', 'user1.jpg');
  public emplois: Emploi[] = [];
  public competences: Competence[] = [];
  public faSearch: IconDefinition = faSearch;
  public domaines: Domaine[] = [];

  constructor(private randomModels: RandomModelsService) { }

  ngOnInit() {
    this.competences = this.randomModels.getRandomCompetence(4);
    this.domaines = this.randomModels.getRandomDomaine(5);
    this.emplois = this.randomModels.getRandomEmplois(6);
  }
}
