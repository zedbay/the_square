import { Neo4j } from "../../neo4j";
import { v1 } from "neo4j-driver";
import { Security } from "../../security/security";

export class ActivityHandler {

    public static add(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request = `MATCH (e:${claims.get('type')}),(a:Activity) 
            WHERE ID(e) = ${v1.int(claims.get('id'))} AND ID(a) = ${req.body.idActivity} CREATE (e)-[:INACTIVITY]->(a)`;
        Neo4j.execute(request).then(() => {
            return res.status(204).json({});
        });
    }

    public static getActivitys(req: any, res: any) {
        const request = `MATCH (a:Activity) RETURN a`;
        Neo4j.execute(request).then(activitys => {
            return res.status(200).json({ data: activitys.records });
        })
    }

    public static get(req: any, res: any) {
        const request = `MATCH (e:${req.params.typeEntity})-[:INACTIVITY]->(a:Activity) 
            WHERE ID(e) = ${v1.int(req.params.idEntity)} RETURN a`;
        Neo4j.execute(request).then(activity => {
            return res.status(200).json({ data: activity.records[0].get(0) });
        });
    }

    public static delete(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request = `MATCH (e:${claims.get('type')})-[r:INACTIVITY]->(a:Activity { entitled: 
            ${req.params.entitled}}) WHERE ID(e) = 
        ${v1.int(claims.get('id'))} DELETE r`;
        Neo4j.execute(request).then(() => {
            return res.status(200).json({});
        });
    }
}