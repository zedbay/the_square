import { Neo4j } from "../neo4j";
import { v1 } from "neo4j-driver";
import { Security } from "../security/security";

export class PostHandler {

    public static create(req, res) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request =
            `MATCH 
                (e:${claims.get('type')}) 
            WHERE 
                ID(e) = ${v1.int(claims.get('id'))}
            CREATE 
                (p:Post { message: "${req.body.message}", date: "${new Date().toString()}"}),
                (e)-[:PUBLISH]->(p) 
            RETURN p`;
        Neo4j.execute(request)
            .then((post) => {
                return res.status(200).json({ data: post });
            })
            .catch((err) => {
                return res.status(500).json({ error: err });
            })
            ;
    }

    public static delete(req, res) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request =
            `MATCH 
                (e:${claims.get('type')}),
                (p:Post)
            WHERE 
                ID(e) = ${v1.int(claims.get('id'))} AND 
                ID(p) = ${req.params.idPost} AND
                (e)-[:PUBLISH]->(p)
            DETACH DELETE p`;
        Neo4j.execute(request)
            .then(() => {
                return res.status(200).json({});
            })
            .catch((err) => {
                return res.status(500).json({ error: err });
            })
            ;
    }

    public static react(req, res) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request =
            `MATCH 
                (e: ${claims.get('type')}),
                (p:Post)
            WHERE
                ID(e) = ${v1.int(claims.get('id'))} AND
                ID(p) = ${req.body.idPost}
            CREATE 
                (e)-[:${req.body.reaction}]->(p)`;
        Neo4j.execute(request)
            .then(() => {
                return res.status(200).json({});
            })
            .catch((err) => {
                return res.status(500).json({ error: err });
            })
            ;
    }

    public static get(req, res) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request =
            `MATCH 
                (e:${claims.get('type')})-[]-(a)-[:PUBLISH]->(p:Post)
            WHERE 
                ID(e) = ${v1.int(claims.get('id'))}
            RETURN DISTINCT p, a LIMIT 15`
        Neo4j.execute(request)
            .then((posts) => {
                return res.status(200).json({
                    posts: posts.records.map(element => element.get(0)),
                    authors: posts.records.map(element => element.get(1))
                });
            })
            .catch(err => {
                return res.status(500).json({ error: err });
            })
            ;
    }

    public static getPostForOneEntity(req, res) {
        const request =
            `MATCH 
                (e)-[:PUBLISH]->(p:Post) 
            WHERE 
                ID(e) = ${v1.int(req.params.idTarget)} 
            RETURN p`;
        Neo4j.execute(request)
            .then((posts) => {
                return res.status(200).json({ data: posts.records.map(element => element.get(0)) });
            })
            .catch((err) => {
                return res.status(500).json({ error: err });
            })
            ;
    }
}