import { Neo4j } from "../neo4j";
import { v1 } from "neo4j-driver";
import { Security } from "../security/security";

export class JobHandler {

    public static add(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        let request = `MATCH (e:Entreprise) WHERE ID(e) = ${v1.int(claims.get('id'))} 
            CREATE (j:Job { description: "${req.body.description}", salary: "${req.body.salary}", 
            entitled: "${req.body.entitled}" }), (e)-[:OFFER]->(j) RETURN j`;
        Neo4j.execute(request).then(result => {
            request = `WITH ${req.body.skills.map(element => v1.int(element))} 
                AS skills UNWIND skills AS skill MATCH (s:Skill), (j:Job) 
                WHERE ID(s) = skill AND ID(j) = ${result.records[0].get(0).identity} CREATE (j)-[:HAVENEED]->(s)`;
            Neo4j.execute(request).then(() => {
                return res.status(204).json({});
            });
        });
    }

    public static get(req: any, res: any) {
        const request = "MATCH (j:Job) RETURN j";
        Neo4j.execute(request).then(jobs => {
            return res.status(200).json({ data: jobs.records.map(element => element.get(0)) });
        });
    }

    public static delete(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request = `MATCH (e:Entreprise)-[:OFFER]->(j:Job) WHERE ID(e) = ${v1.int(claims.get('id'))} 
            AND ID(j) = ${v1.int(req.params.idJob)} DETACH DELETE j`;
        Neo4j.execute(request).then(() => {
            return res.status(200).json({});
        });
    }
}

