export class Personne {

    public nom: string;
    public intitule: string;
    public photo: string;

    constructor(nom: string, intitule: string, photo?: string) {
        this.intitule = intitule;
        this.nom = nom;
        photo ? this.photo = photo : this.photo = "default.png";
    }
    
}