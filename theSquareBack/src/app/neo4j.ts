import { v1 as neo4j } from 'neo4j-driver';
 
export class Neo4j {

    public driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'azerty'));;
    public session = this.driver.session();

    constructor() { }

}