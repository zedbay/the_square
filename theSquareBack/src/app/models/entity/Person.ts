
import { Experience } from '../lived/Experience';
import { Formation } from '../lived/Formation';
import { Skill } from '../trait/Skill';
import { Hobby } from '../trait/Hobby';
import { Entity } from './Entity';
import { Professional } from './Professional';

export class Person extends Entity {

    public firstName: string;
    public experiences: Experience[];
    public formations: Formation[];
    public skills: Skill[];
    public hobbies: Hobby[];
    public friends: Person[];
    public friendsRequest: Person[];
    public follows: Professional[];
    public entitled: string;

    constructor(value: Object) {
        super(value);
        value['firstName'] ? this.firstName = value['firstName'] : this.firstName = undefined;
        value['experiences'] ? this.experiences = value['experiences'] : this.experiences = undefined;
        value['formations'] ? this.formations = value['formations'] : this.formations = undefined;
        value['skills'] ? this.skills = value['skills'] : this.skills = undefined;
        value['hobbies'] ? this.hobbies = value['hobbies'] : this.hobbies = undefined;
        value['friends'] ? this.friends = value['friends'] : this.friends = undefined;
        value['friendsRequest'] ? this.friendsRequest = value['friendsRequest'] : this.friendsRequest = undefined;
    }
}