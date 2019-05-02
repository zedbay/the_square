import { Neo4j } from "../../neo4j";
import { v1 } from "neo4j-driver";
import { Security } from "../../security/security";

export class HobbyHandler {

    public static add(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request = `MATCH (e:Person),(h:Hobby { entitled: "${req.body.entitled}" }) 
            WHERE ID(e) = ${v1.int(claims.get('id'))} CREATE (e)-[:LOVE]->(h)`;
        Neo4j.execute(request).then(() => {
            return res.status(204).json({});
        });
    }

    public static get(req: any, res: any) {
        const request = `MATCH (e:Person)-[:LOVE]->(h:Hobby) WHERE ID(e) = ${v1.int(req.params.idPerson)} RETURN h`;
        Neo4j.execute(request).then(hobbys => {
            return res.status(200).json({ data: hobbys.records.map(element => element.get(0)) });
        });
    }

    public static getHobbies(req: any, res: any) {
        const request = `MATCH (h:Hobby) RETURN h`;
        Neo4j.execute(request).then(hobbies => {
            return res.status(200).json({ data: hobbies.records.map(element => element.get(0)) });
        });
    }

    public static delete(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request = `MATCH (e:Person)-[r:LOVE]->(h:Hobby { entitled: "${req.params.entitled}" }) 
            WHERE ID(e) = ${v1.int(claims.get('id'))} DETACH DELETE r`;
        Neo4j.execute(request).then(() => {
            return res.status(200).json({});
        });
    }
}