import { Component, OnInit } from '@angular/core';
import { Personne } from '../../shared/models/personne';
import { IconDefinition, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material';
import { NetworkService } from "../../shared/services/network.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-liste-amis',
  templateUrl: './liste-amis.component.html',
  styleUrls: ['./liste-amis.component.scss']
})
export class ListeAmisComponent implements OnInit {

  public faTimes: IconDefinition = faTimes;
  public faCheck: IconDefinition = faCheck;
  public someRequest: boolean = false;
  public friends = [];
  public friendsRequest = [];

  constructor(private snackBar: MatSnackBar, private networkService: NetworkService, private route: ActivatedRoute) {
    this.loadFriendsRequest();
  }

  ngOnInit() {
    this.route.params.subscribe((e) => {
      this.loadFriendList(e.id);
    });
  }

  private loadFriendsRequest() {
    this.networkService.get('person/friendsRequest').subscribe(friends => {
      this.friendsRequest = friends["data"];
      this.displayRequest();
    });
  }

  private loadFriendList(idUser: string) {
    this.networkService.get('person/friends/' + idUser).subscribe(friends => {
      this.friends = friends["data"];
    });
  }


  private displayRequest() {
    this.friendsRequest.length > 0 ? this.someRequest = true : this.someRequest = false;
  }

  public onAcceptRequest(idPerson: number, friend: any, index: number) {
    this.networkService.post('person/responseFriendRequest', { idPerson: idPerson, response: true }).subscribe(() => {
      this.friends.push(friend);
      index === 0 ? this.friendsRequest.shift() : this.friendsRequest.slice(index, index);
      this.snackBar.open(friend.properties.firstName + ' ' + friend.properties.name + ' ajouté à vos relations', '', { duration: 3000, horizontalPosition: "right" });
      this.displayRequest();
    });
  }

  public onRejectRequest(idPerson: number, friend: any, index: number) {
    this.networkService.post('person/responseFriendRequest', { idPerson: idPerson, response: false }).subscribe(() => {
      index === 0 ? this.friendsRequest.shift() : this.friendsRequest.slice(index, index);
      this.snackBar.open(friend.properties.firstName + ' ' + friend.properties.name + ' refusé', '', { duration: 3000, horizontalPosition: "right" });
      this.displayRequest();
    });
  }

}
