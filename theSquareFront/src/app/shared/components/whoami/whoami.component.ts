import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../services/network.service';
import { JwtService } from '../../services/jwt.service';

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

  constructor(private networkService: NetworkService, private jwt: JwtService) {
    const claims = this.jwt.getClaims();
    this.networkService.get('entity/' + claims.get('id')).subscribe(iam => {
      this.iam = iam['data'];
    });
  }

  ngOnInit() {

  }

}
