import { v1 as neo4j } from 'neo4j-driver';
import { session } from 'neo4j-driver/types/v1';

export class Neo4j {

    public driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'azerty'));;
    public session = this.driver.session();

    constructor() {
        this.session.run('MATCH (n:Person { email : "kk@gmail.com", password : "a" }) RETURN n').then(r => {
            console.log(r.records[0].get(0));
        });
    }

}