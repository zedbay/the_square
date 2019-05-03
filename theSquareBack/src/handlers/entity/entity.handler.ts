import { Neo4j } from "../../neo4j";
import { v1 } from "neo4j-driver";

export class EntityHandler {

    public static search(req: any, res: any) {
        const request = `MATCH (e { name: "${req.body.first}"}) RETURN e AS entity UNION 
            MATCH (e { firstName: "${req.body.first}"}) RETURN e AS entity UNION
            MATCH (e { firstName: "${req.body.second}"}) RETURN e AS entity UNION
            MATCH (e { name: "${req.body.second}"}) RETURN e AS entity`;
        Neo4j.execute(request).then(entitys => {
            return res.status(200).json({ data: entitys.records.map(element => element.get(0)) });
        });
    }

    public static get(req: any, res: any) {
        const request = `MATCH (e:Person) WHERE ID(e) = ${v1.int(req.params.idEntity)} RETURN e`;
        Neo4j.execute(request).then(entity => {
            return res.status(200).json({ data: entity.records[0].get(0) });
        });
    }
}