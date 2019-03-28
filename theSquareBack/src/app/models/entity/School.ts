import { Professional } from "./Professional";
import { Person } from "./Person";

export class School extends Professional {

    public students: Person[];

    constructor(value: Object) {
        super(value);
    }
}