export class Entreprise {
    
    public nom: string;
    public description: string;
    public photo: string;

    constructor(nom: string, description: string, photo: string) {
        this.nom = nom;
        this.description = description;
        this.photo = photo;
    }
}