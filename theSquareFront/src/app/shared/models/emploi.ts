import { Entreprise } from './entreprise';

export class Emploi {

    public description: string;
    public intitule: string;
    public salaire: number;
    public entreprise

    constructor(description: string, intitule: string, salaire: number, entreprise: Entreprise) {
        this.salaire = salaire;
        this.intitule = intitule;
        this.description = description;
        this.entreprise = entreprise;
    }
}