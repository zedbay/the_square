import { Neo4j } from "../../neo4j";
import { v1 } from "neo4j-driver";
import { Security } from "../../security/security";

export class FormationHandler {

    public static create(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request = `MATCH (e:${claims.get('type')}), (s:School { name: "${req.body.school}" }) WHERE ID(e) = ${v1.int(claims.get('id'))}
            CREATE (f:Formation { entitled: "${req.body.entitled}", description: "${req.body.description}", endDate: "${req.body.endDate}", 
            startDate: "${req.body.startDate}" }), (e)-[:STUDY]->(f), (f)-[:IN]->(s) RETURN f`;
        Neo4j.execute(request).then((formation) => {
            return res.status(201).json({ data: formation.records[0].get(0).properties });
        });
    }

    public static get(req: any, res: any) {
        const request = `MATCH (p:Person)-[:STUDY]->(f:Formation) WHERE ID(p) = ${v1.int(req.params.idPerson)} RETURN f`;
        Neo4j.execute(request).then((formations => {
            return res.status(200).json({ data: formations.records.map(element => element.get(0)) });
        }));
    }

    public static delete(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request = `MATCH (e:${claims.get('type')})-[s:STUDY]->(f:Formation { entitled: "${req.params.entitled}" }) 
            WHERE ID(e) = ${v1.int(claims.get('id'))} DETACH DELETE f`;
        Neo4j.execute(request).then(() => {
            return res.status(200).json({});
        });
    }
}