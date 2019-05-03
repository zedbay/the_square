import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private router: Router, private networkService: NetworkService) { }

  public onVisitProfil(personne: any) {
    this.router.navigate(['/profil/' + personne.identity.low]);
  }

  public onFriendRequest(personne: any) {
    return this.networkService.post('person/friendsRequest', { idCollector: personne["identity"]["low"] });
  }

  public onAcceptFriendRequest(personne: any) {

  }

  public onRejectFriendRequest() {

  }

  public onDeleteFriendRelation() {

  }
}
