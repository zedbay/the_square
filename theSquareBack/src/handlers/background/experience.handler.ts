import { Neo4j } from "../../neo4j";
import { v1 } from "neo4j-driver";
import { Security } from "../../security/security";
export class ExperienceHandler {

    public static create(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request = `MATCH (e:${claims.get('type')}), (en:Entreprise 
            { name: "${req.body.entreprise}" }) WHERE ID(e) = ${v1.int(claims.get('id'))}
            CREATE (ex:Experience { entitled: "${req.body.entitled}", description: 
            "${req.body.description}", endDate: "${req.body.endDate}", 
            startDate: "${req.body.startDate}" }), (e)-[:DO]->(ex), (ex)-[:IN]->(en) RETURN ex`;
        Neo4j.execute(request).then((experience) => {
            return res.status(201).json({ data: experience.records[0].get(0).properties });
        });
    }

    public static get(req: any, res: any) {
        const request = `MATCH (p:Person)-[:DO]->(e:Experience) WHERE ID(p) = ${v1.int(req.params.idPerson)} RETURN e`;
        Neo4j.execute(request).then((experiences) => {
            return res.status(200).json({ data: experiences.records.map(element => element.get(0)) });
        });
    }

    public static delete(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request = `MATCH (p:Person)-[r:DO]->(e:Experience { entitled: "
            ${req.params.entitled}" }) WHERE ID(p) = ${v1.int(claims.get('id'))} DETACH DELETE r`;
        Neo4j.execute(request).then(() => {
            return res.status(200).json({});
        });
    }
}