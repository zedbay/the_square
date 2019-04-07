import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Entreprise } from '../../shared/models/entreprise';
import { Emploi } from '../../shared/models/emploi';
import { MatSnackBar } from '@angular/material';
import { NetworkService } from '../../shared/services/network.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SuggestionComponent implements OnInit {

  @Input() entreprises: Entreprise[];
  @Input() emplois: Emploi[];

  public friendSuggestions;

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit() { }

  public displayFollow(entreprise: Entreprise) {
    this.snackBar.open(entreprise.nom + ' a bien été suivi', '', { duration: 3000, horizontalPosition: "right" });
  }
}
