import { Neo4j } from "../neo4j";
import { v1 } from "neo4j-driver";

export class AdminHandler {

    public static deleteEntity(req, res) {
        const request = `MATCH (e) WHERE ID(e) = ${v1.int(req.params.idEntity)} DETACH DELETE e`;
        Neo4j.execute(request)
            .then(() => {
                return res.status(200).json({});
            })
            .catch(err => {
                return res.status(400).json({ error: err });
            });
    }

    public static deletePost(req, res) {
        const request = `MATCH (p:Post) WHERE ID(p) = ${v1.int(req.params.idPost)} DETACH DELETE p`;
        Neo4j.execute(request)
            .then(() => {
                return res.status(200).json({});
            })
            .catch(err => {
                return res.status(400).json({ error: err });
            });
    }
}