import { v1 as neo4j } from 'neo4j-driver';
import { Driver, Session } from 'neo4j-driver/types/v1';
import * as config from '../config.json';

export class Neo4j {

    private static driver: Driver = neo4j.driver(
        `bolt://neo4j:${config['neo4j']['host']}`,
        neo4j.auth.basic(config['neo4j']['bdd'],
            config['neo4j']['password']));
    private static session: Session = Neo4j.driver.session();

    public static async execute(request: string) {
        return await Neo4j.session.run(request);
    }

}