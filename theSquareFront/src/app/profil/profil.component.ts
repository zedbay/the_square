import { Component, OnInit } from '@angular/core';
import { Personne } from '../shared/models/personne';
import { Formation } from '../shared/models/formation';
import { RandomModelsService } from '../shared/services/random-models.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public iam: Personne;
  public amis: Personne[] = [];
  public requeteAmis: Personne[] = [];
  private formations: Formation[] = [];

  constructor(private randomModels: RandomModelsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.amis = this.randomModels.getRandomPersonne(2);
    this.requeteAmis = this.randomModels.getRandomPersonne(1);
    this.iam = this.randomModels.getIam();
    console.log(this.route.snapshot.paramMap.get('id'));
  }
}
