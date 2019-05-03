import { Neo4j } from "../../neo4j";
import { v1 } from "neo4j-driver";
import { Security } from "../../security/security";

export class SkillHandler {

    public static delete(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request = `MATCH (e:${claims.get('type')})-[r:MASTERY]->(s:Skill { entitled: "${req.params.entitled}" }) 
            WHERE ID(e) = ${v1.int(claims.get('id'))} DETACH DELETE r`;
        Neo4j.execute(request).then(() => {
            return res.status(200).json({});
        });
    }

    public static add(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request = `MATCH (e:${claims.get('type')}),(s:Skill { entitled: "${req.body.entitled}" }) 
            WHERE ID(e) = ${v1.int(claims.get('id'))} CREATE (e)-[:MASTERY]->(s)`;
        Neo4j.execute(request).then(() => {
            return res.status(200).json({});
        });
    }

    public static getSkills(req: any, res: any) {
        const request = `MATCH (s:Skill) RETURN s`;
        Neo4j.execute(request).then(skills => {
            return res.status(200).json({ data: skills.records.map(element => element.get(0)) });
        });
    }

    public static get(req: any, res: any) {
        const request = `MATCH (e:${req.params.typeEntity})-[:MASTERY]->(s:Skill) WHERE ID(e) = ${v1.int(req.params.idEntity)} RETURN s`;
        Neo4j.execute(request).then(skills => {
            return res.status(200).json({ data: skills.records.map(element => element.get(0)) });
        });
    }

}