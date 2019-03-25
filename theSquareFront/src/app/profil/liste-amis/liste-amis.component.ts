import { Component, OnInit, Input } from '@angular/core';
import { Personne } from '../../shared/models/personne';
import { IconDefinition, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-liste-amis',
  templateUrl: './liste-amis.component.html',
  styleUrls: ['./liste-amis.component.scss']
})
export class ListeAmisComponent implements OnInit {

  @Input() amis: Personne[];
  @Input() requeteAmis: Personne[];

  public faTimes: IconDefinition = faTimes;
  public faCheck: IconDefinition = faCheck;
  public someRequest: boolean = false;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.displayRequest();
  }

  private displayRequest() {
    this.requeteAmis.length > 0 ? this.someRequest = true : this.someRequest = false;
  } 

  public onAcceptRequest(friend: Personne) {
    this.snackBar.open(friend.nom + ' ajouté à vos relations', '', { duration: 3000, horizontalPosition: "right" });
    this.requeteAmis.pop();
    this.displayRequest();
  }

  public onRejectRequest(frien: Personne) {
    this.snackBar.open('Invitation refusé', '', { duration: 3000, horizontalPosition: "right" });
    this.requeteAmis.pop();
    this.displayRequest();
  }

}
