import { Formation } from './formation';
import { Hobbie } from './hobbie';
import { Competence } from './competence';

export class Personne {

    public nom: string;
    public intitule: string;
    public photo: string;
    public ville: string;
    public dateDeNaissance: Date;
    public formations: Formation[];
    public competences: Competence[];
    public hobbies: Hobbie[];

    constructor(nom: string, intitule: string, photo?: string, ville?: string, dateDeNaissance?: Date, formations?: Formation[], hobbies?: Hobbie[], competences?: Competence[]) {
        this.intitule = intitule;
        this.nom = nom;
        photo ? this.photo = photo : this.photo = "default.png";
        if (ville) this.ville = ville;
        if (dateDeNaissance) this.dateDeNaissance = dateDeNaissance;
        if (formations) this.formations = formations;
        if (hobbies) this.hobbies = hobbies;
        if (Competence) this.competences = competences;
    }
    
}