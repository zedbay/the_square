import { Entreprise } from './entreprise';

export class Formation {

    public intitule: string;
    public description: string;
    public debut: Date;
    public fin: Date;
    public entreprise: Entreprise;

    constructor(intitule: string, description: string, entreprise: Entreprise,  debut: Date, fin?: Date) {
        this.intitule = intitule;
        this.description = description;
        this.debut = debut;
        this.entreprise = entreprise;
        if (fin) this.fin = fin;
    }
}