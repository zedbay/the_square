import { Component, OnInit, Input } from '@angular/core';
import { Entreprise } from '../../../shared/models/entreprise';
import { Personne } from '../../../shared/models/personne';
import { Emploi } from '../../../shared/models/emploi';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {

  @Input() entreprises: Entreprise[];
  @Input() personnes: Personne[];
  @Input() emplois: Emploi[];

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() { }

  public displayAskFriend(personne: Personne) {
    this.snackBar.open('Demande d\'amis envoyé à ' + personne.nom, '', { duration: 2000 });
  }

  public displayFollow(entreprise: Entreprise) {
    this.snackBar.open(entreprise.nom + ' a bien été suivi', '', { duration: 2000 });
  }
}
