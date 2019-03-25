import { Component, OnInit, Input } from '@angular/core';
import { Personne } from '../../../shared/models/personne';
import { RandomModelsService } from '../../services/random-models.service';

@Component({
  selector: 'app-whoami',
  templateUrl: './whoami.component.html',
  styleUrls: ['./whoami.component.scss']
})
export class WhoamiComponent implements OnInit {

  public iam: Personne;

  constructor(private randomModels: RandomModelsService) { }

  ngOnInit() {
    this.iam = this.randomModels.getIam();
  }

}
