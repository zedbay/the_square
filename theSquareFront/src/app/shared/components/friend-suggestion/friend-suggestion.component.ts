import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../services/network.service';
import { MatSnackBar } from '@angular/material';
import { FriendService } from '../../services/friend.service';

@Component({
  selector: 'app-friend-suggestion',
  templateUrl: './friend-suggestion.component.html',
  styleUrls: ['./friend-suggestion.component.scss']
})
export class FriendSuggestionComponent implements OnInit {

  public friendSuggestions: any = { users: [], commun: [] };

  constructor(private networkService: NetworkService, private snackBar: MatSnackBar, private friendService: FriendService) { }

  ngOnInit() {
    this.loadFriendSuggestions();
  }

  private loadFriendSuggestions() {
    this.networkService.get('person/friendSuggestion').subscribe(users => {
      this.friendSuggestions = users;
    });
  }

  public onFriendRequest(personne: any, index: number) {
    this.friendService.onFriendRequest(personne).subscribe(() => {
      index === 0 ? this.friendSuggestions.users.shift() : this.friendSuggestions.users.slice(index, index);
      this.snackBar.open('Demande d\'amis envoyé à ' + personne.properties.firstName + ' ' + personne.properties.name, '', { duration: 3000, horizontalPosition: "right" });
    });
  }

  public onVisitProfil(personne: any) {
    this.friendService.onVisitProfil(personne);
  }

}
