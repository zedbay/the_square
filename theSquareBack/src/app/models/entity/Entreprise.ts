import { Professional } from "./Professional";
import { Job } from "../Job";
import { Person } from "./Person";

export class Entreprise extends Professional {

    public jobs: Job[];
    public employees: Person[];

    constructor(value: Object) {
        super(value);
    }
}