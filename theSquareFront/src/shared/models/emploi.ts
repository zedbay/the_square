export class Emploi {

    public description: string;
    public intitule: string;
    public salaire: number;

    constructor(description: string, intitule: string, salaire: number) {
        this.salaire = salaire;
        this.intitule = intitule;
        this.description = description;
    }
}