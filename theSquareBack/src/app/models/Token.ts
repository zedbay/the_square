import { Entity } from "./entity/Entity";

export class Token {

    public expiration: Date;
    public entity: Entity;
    public token: string;

    constructor() { }
    
}