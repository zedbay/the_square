import { Neo4j } from "../../neo4j";
import { v1 } from "neo4j-driver";
import { Security } from "../../security/security";

export class PersonHandler {

    public static getFriendSuggestion(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request = `MATCH (p:Person)-[:FRIEND]-(p1:Person)-[:FRIEND]-(p2:Person) 
            WHERE ID(p) = ${v1.int(claims.get('id'))} AND NOT (p)-[:FRIEND]-(p2) 
            RETURN DISTINCT p2, count(p2) ORDER BY count(p2) DESC LIMIT 5`;
        Neo4j.execute(request).then(users => {
            return res.status(200).json({
                users: users.records.map(element => element.get(0)),
                commun: users.records.map(element => element.get(1))
            });
        });
    }

    public static getFriendsInCommon(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request = `MATCH (p:Person)-[:FRIEND]-(p1:Person)-[:FRIEND]-(p2:Person) 
            WHERE ID(p) = ${v1.int(claims.get('id'))} AND ID(p2) = ${req.params.idPerson} RETURN p1`;
        Neo4j.execute(request).then(friendsInCommon => {
            return res.status(200).json({
                data: friendsInCommon.records.map(element => element.get(0))
            });
        });
    }

    public static getFollow(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request = `MATCH (p:Person), (p)-[:FOLLOW]->(e) WHERE ID(p) = ${v1.int(claims.get('id'))} RETURN e`;
        Neo4j.execute(request).then(follows => {
            return res.status(200).json({ data: follows.records.map(element => element.get(0)) });
        });
    }

    public static deleteFollow(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request = `MATCH (p:Person)-[f:FOLLOW]->(e) WHERE ID(p) = ${v1.int(claims.get('id'))} 
            AND ID(e) = ${v1.int(req.params.idEntity)} DETACH DELETE f`;
        Neo4j.execute(request).then(() => {
            return res.status(200).json({});
        });
    }

    public static follow(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request = `MATCH (p:Person), (e) WHERE ID(e) = ${v1.int(req.body.idEntity)} 
            AND ID(p) = ${v1.int(claims.get('id'))} CREATE (p)-[:FOLLOW]->(e)`;
        Neo4j.execute(request).then(() => {
            return res.status(200).json({});
        });
    }

    public static responseFriendRequest(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        let request: string;
        if (!req.body.response) {
            request = `MATCH (p1:Person)-[r:FRIENDREQUEST]->(p2:Person) WHERE ID(p1) = ${v1.int(req.body.idPerson)} 
                AND ID(p2) = ${v1.int(claims.get('id'))} DETACH DELETE r`;
        } else {
            request = `MATCH (p1:Person)-[r:FRIENDREQUEST]->(p2:Person) WHERE ID(p1) = ${v1.int(req.body.idPerson)} 
            AND ID(p2) = ${v1.int(claims.get('id'))} CREATE (p1)-[:FRIEND]->(p2) DETACH DELETE r`
        }
        Neo4j.execute(request).then(() => {
            return res.status(200).json({}); 
        });
    }

    public static addFriendsRequest(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request = `MATCH (p:Person), (p1:Person) WHERE ID(p) = ${v1.int(claims.get('id'))} 
            AND ID(p1) = ${req.body.idCollector} CREATE (p)-[:FRIENDREQUEST]->(p1)`;
        Neo4j.execute(request).then(() => {
            return res.status(200).json({});
        });

    }

    public static getFriends(req: any, res: any) {
        const request = `MATCH (p:Person), (p)-[:FRIEND]-(p1:Person) WHERE ID(p) = ${v1.int(req.params.idEntity)} RETURN p1`;
        Neo4j.execute(request).then(friends => {
            return res.status(200).json({ data: friends.records.map(element => element.get(0)) });
        });
    }

    public static getFriendsRequest(req: any, res: any) {
        const claims: Map<string, any> = Security.getIdentity(req);
        const request = `MATCH (p:Person), (p)<-[:FRIENDREQUEST]-(p1:Person) 
            WHERE ID(p) = ${v1.int(claims.get('id'))} RETURN p1`;
        Neo4j.execute(request).then(friendRequests => {
            return res.status(200).json({ data: friendRequests.records.map(element => element.get(0)) });
        });
    }

    public static create(req: any, res: any) {
        const request = `CREATE (p:Person { email: "${req.body.email}", password: "${req.body.password}", 
            firstName: "${req.body.firstName}", name: "${req.body.name}" }) RETURN p`;
        Neo4j.execute(request).then(person => {
            return Security.login(req, res);
        });
    }
}