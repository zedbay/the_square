import { Injectable } from '@angular/core';
import { Competence } from '../models/competence';
import { Domaine } from '../models/domaine';
import { Emploi } from '../models/emploi';
import { Entreprise } from '../models/entreprise';
import { Formation } from '../models/formation';
import { Hobbie } from '../models/hobbie';
import { Personne } from '../models/personne';

@Injectable({
  providedIn: 'root'
})
export class RandomModelsService {

  private competences: Competence[] = [];
  private domaines: Domaine[] = [];
  private emplois: Emploi[] = [];
  private entreprises: Entreprise[] = [];
  private iam: Personne;
  private personnes: Personne[] = [];
  private formations: Formation[] = [];
  private hobbies: Hobbie[] = [];

  constructor() {

    this.hobbies.push(new Hobbie('Cuisine'));
    this.hobbies.push(new Hobbie('Informatique'));
    this.hobbies.push(new Hobbie('Escalade'));
  
    this.competences.push(new Competence('C'));
    this.competences.push(new Competence('Html/Css'));
    this.competences.push(new Competence('Angular'));
    this.competences.push(new Competence('GoLang'));

    this.domaines.push(new Domaine('Informatique'));
    this.domaines.push(new Domaine('Médical'));
    this.domaines.push(new Domaine('Droit'));
    this.domaines.push(new Domaine('Sociologie'));
    this.domaines.push(new Domaine('Agriculture'));

    this.entreprises.push(new Entreprise('Mind7', 'Entreprise big data', 'entreprise.jpg'));
    this.entreprises.push(new Entreprise('La poste', 'Service de livraison de courrier', 'entreprise.jpg'));
    this.entreprises.push(new Entreprise('Dunder mifflin', 'Entreprise de vente de papier', 'entreprise.jpg'));

    this.formations.push(new Formation('Developeur front', 'Developement Angular sur un porjet big data', this.getRandomEntreprise(1)[0], new Date(), new Date()));
    this.formations.push(new Formation('Licence d\'informatique', 'Licence obtenu à l\'université Paris Descartes', this.getRandomEntreprise(1)[0], new Date(), new Date()));
  
    this.emplois.push(new Emploi('Garde de chien et de chat', 'Garde d\'animaux', 1200, this.getRandomEntreprise(1)[0]));
    this.emplois.push(new Emploi('Dévelopeur blockchain', 'Dévelopeur', 3200, this.getRandomEntreprise(1)[0]));
    this.emplois.push(new Emploi('Mission de sécurité pour monoprix', 'Vigile', 3700, this.getRandomEntreprise(1)[0]));
    this.emplois.push(new Emploi('Docteur généraliste dans un cabinet', 'Docteur', 1200, this.getRandomEntreprise(1)[0]));
    this.emplois.push(new Emploi('Enseignant au collège', 'Professeur', 1200, this.getRandomEntreprise(1)[0]));
    this.emplois.push(new Emploi('Pour ne défendre que les innocents .. ', 'Avocat', 1200, this.getRandomEntreprise(1)[0]));

    this.iam = new Personne('Antoine Heurtault', 'Dévelopeur front', 'user1.jpg', 'Le Kremlin-Bicêtre', new Date(), this.getRandomFormation(2), this.getRandomHobbie(2), this.getRandomCompetence(3));

    this.personnes.push(new Personne('Bernard dupond', 'Cammioneur'));
    this.personnes.push(this.iam);
    this.personnes.push(new Personne('Anthony Bohin', 'Gardien de la paix'));
    this.personnes.push(new Personne('Eva Hugot', 'Guide touristique'));

  }

  public getRandomFormation(nombre: number): Formation[] {
    return this.formations.slice(0, nombre);
  }

  public getRandomHobbie(nombre: number): Hobbie[] {
    return this.hobbies.slice(0, nombre);
  }

  public getRandomPersonne(nombre: number): Personne[] {
    return this.personnes.slice(0, nombre);
  }

  public getIam(): Personne {
    return this.iam;
  }

  public getRandomEntreprise(nombre: number): Entreprise[] {
    return this.entreprises.slice(0, nombre);
  }

  public getRandomEmplois(nombre: number): Emploi[] {
    return this.emplois.slice(0, nombre);
  }

  public getRandomCompetence(nombre: number): Competence[] {
    return this.competences.slice(0, nombre);
  }

  public getRandomDomaine(nombre: number): Domaine[] {
    return this.domaines.slice(0, nombre);
  }
}
