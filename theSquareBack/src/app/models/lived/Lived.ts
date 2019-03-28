import { Entity } from "../entity/Entity";

export class Lived { 

    public entitled: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public entity: Entity;

    constructor(value: Object) {
        value['entitled'] ? this.entitled = value['name'] : this.entitled = undefined;
    }
}