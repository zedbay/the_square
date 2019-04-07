import { Component, OnInit, Input } from '@angular/core';
import { RandomModelsService } from '../../services/random-models.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-whoami',
  templateUrl: './whoami.component.html',
  styleUrls: ['./whoami.component.scss']
})
export class WhoamiComponent implements OnInit {

  public iam = {
    properties: {
      name: "",
      firstName: "",
      entitled: ""
    }
  };

  constructor(private randomModels: RandomModelsService, private networkService: NetworkService) {
    this.networkService.get('entity').subscribe(iam => {
      this.iam = iam['data'];
    });
  }

  ngOnInit() {

  }

}
