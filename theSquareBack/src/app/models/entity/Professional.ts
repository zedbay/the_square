import { Entity } from './Entity';
import { Person } from './Person';

export class Professional extends Entity {

    public followers: Person[];
    public description: string;
    
    constructor(value: Object) {
        super(value);
    }

    private static getFollowers(req: any, res: any) {
        
    }
}