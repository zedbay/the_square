import { Component, OnInit } from '@angular/core';
import { Entreprise } from '../../shared/models/entreprise';
import { Personne } from '../../shared/models/personne';
import { Emploi } from '../../shared/models/emploi';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  public entreprises: Entreprise[] = [];
  public personnes: Personne[] = [];
  public emplois: Emploi[] = [];
  public iam: Personne;

  constructor() { }

  ngOnInit() {
    this.iam = new Personne('Antoine Heurtault', 'Dévelopeur front', 'user1.jpg');

    this.entreprises.push(new Entreprise('Mind7', 'Entreprise big data'));
    this.entreprises.push(new Entreprise('La poste', 'Service de livraison de courrier'));

    this.personnes.push(this.iam);
    this.personnes.push(new Personne('Anthony Bohin', 'Gardien de la paix'));
    this.personnes.push(new Personne('Eva Hugot', 'Guide touristique'));

    this.emplois.push(new Emploi('Garde de chien et de chat', 'Garde d\'animaux', 1200));
    this.emplois.push(new Emploi('Dévelopeur blockchain', 'Dévelopeur', 3200));
    this.emplois.push(new Emploi('Docteur généraliste dans un cabinet idéalement situé en coeur de ville', 'Docteur', 1200));
  }

}
