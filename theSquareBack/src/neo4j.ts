import { v1 as neo4j } from 'neo4j-driver';
import { Driver, Session } from 'neo4j-driver/types/v1';

export class Neo4j {

    private static driver: Driver = neo4j.driver('bolt://neo4j:7687', neo4j.auth.basic('neo4j', 'azerty'));
    private static session: Session = Neo4j.driver.session();

    public static async execute(request: string) {
        return await Neo4j.session.run(request);
    }

}