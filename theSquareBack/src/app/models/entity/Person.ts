import { Experience } from "../lived/Experience";
import { Formation } from "../lived/Formation";
import { Skill } from "../trait/Skill";
import { Hobby } from "../trait/Hobby";
import { Neo4j } from "../../neo4j";
import { Router, Express } from "express";
import { Token } from "../Token";
import { Entity } from "./Entity";
import { v1 } from 'neo4j-driver';

export class Person {
  public firstName: string;
  public experiences: Experience[];
  public formations: Formation[];
  public skills: Skill[];
  public hobbies: Hobby[];
  public friends: Person[];
  public friendsRequest: Person[];
  public follows: Entity[];
  public entitled: string;

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    const router = Router();
    router.post("/", (req, res) => {
      return Person.create(req, res, neo4j);
    });
    router.get("/friends/:idEntity", (req, res) => {
      return Person.getFriends(req, res, neo4j);
    });
    router.get("/friendsRequest", (req, res) => {
      return Person.getFriendsRequest(req, res, neo4j);
    });
    router.get('/inCommon/:idPerson', (req, res) => {
      return Person.getFriendsInCommon(req, res, neo4j);
    });
    router.get('/friendSuggestion', (req, res) => {
      return Person.getFriendSuggestion(req, res, neo4j);
    })
    router.post("/friendsRequest", (req, res) => {
      return Person.addFriendsRequest(req, res, neo4j);
    });
    router.post("/responseFriendRequest", (req, res) => {
      return Person.responseFriendRequest(req, res, neo4j);
    });
    router.post("/follow", (req, res) => {
      return Person.follow(req, res, neo4j);
    });
    router.get("/follow", (req, res) => {
      return Person.getFollow(req, res, neo4j);
    });
    router.delete("/follow/:idEntity", (req, res) => {
      return Person.deleteFollow(req, res, neo4j);
    });
    express.use("/person", router);
  }

  private static getFriendSuggestion(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers['authorization'], neo4j).then(user => {
      neo4j.session
        .run(`MATCH (p:Person)-[:FRIEND]-(p1:Person)-[:FRIEND]-(p2:Person) 
          WHERE ID(p) = ${user.id} AND NOT (p)-[:FRIEND]-(p2) 
          RETURN DISTINCT p2, count(p2) ORDER BY count(p2) DESC LIMIT 5`)
        .then(users => {
          return res.status(200).json({
            users: users.records.map(element => element.get(0)),
            commun: users.records.map(element => element.get(1))
          });
        });
    });
  }

  private static getFriendsInCommon(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers['authorization'], neo4j).then(user => {
      neo4j.session
        .run(`MATCH (p:Person)-[:FRIEND]-(p1:Person)-[:FRIEND]-(p2:Person) WHERE ID(p) = ${user.id} AND ID(p2) = ${req.params.idPerson} RETURN p1`)
        .then(friendsInCommon => {
          return res.status(200).json({
            data: friendsInCommon.records.map(element => element.get(0))
          });
        });
    })
  }

  private static getFollow(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers['authorization'], neo4j).then(resultat => {
      neo4j.session
        .run(`MATCH (p:Person), (p)-[:FOLLOW]->(e) WHERE ID(p) = ${resultat.id} RETURN e`)
        .then(follows => {
          return res.status(200).json({ data: follows.records.map(element => element.get(0)) });
        });
    });
  }

  private static deleteFollow(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers['authorization'], neo4j).then(resultat => {
      neo4j.session
        .run(`MATCH (p:Person)-[f:FOLLOW]->(e) WHERE ID(p) = ${resultat.id} AND ID(e) = ${v1.int(req.params.idEntity)}
          DETACH DELETE f`)
        .then(() => {
          return res.status(200).json({});
        })
    });
  }

  private static follow(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers['authorization'], neo4j).then(resultat => {
      neo4j.session
        .run(`MATCH (p:Person), (e) WHERE ID(e) = ${v1.int(req.body.idEntity)} AND ID(p) = ${resultat.id}
          CREATE (p)-[:FOLLOW]->(e)`)
        .then(() => {
          return res.status(200).json({});
        });
    });
  }

  private static deleteFriendRequest(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers['authorization'], neo4j).then(resultat => {

    });
  }

  private static responseFriendRequest(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers['authorization'], neo4j).then(resultat => {
      if (!req.body.response) {
        neo4j.session
          .run(`MATCH (p1:Person)-[r:FRIENDREQUEST]->(p2:Person) WHERE ID(p1) = ${v1.int(req.body.idPerson)} AND ID(p2) = ${resultat.id}
          DETACH DELETE r`)
          .then(() => {
            return res.status(200).json({});
          });
      } else {
        neo4j.session
          .run(`MATCH (p1:Person)-[r:FRIENDREQUEST]->(p2:Person) WHERE ID(p1) = ${v1.int(req.body.idPerson)} AND ID(p2) = ${resultat.id}
            CREATE (p1)-[:FRIEND]->(p2) DETACH DELETE r`)
          .then(() => {
            return res.status(200).json({});
          })
      }
    });
  }

  private static addFriendsRequest(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers['authorization'], neo4j).then(resultat => {
      neo4j.session
        .run(`MATCH (p:Person), (p1:Person) WHERE ID(p) = ${resultat.id} AND ID(p1) = ${req.body.idCollector}
          CREATE (p)-[:FRIENDREQUEST]->(p1)`)
        .then(() => {
          return res.status(200).json({});
        });
    });
  }

  private static getFriends(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(`MATCH (p:Person), (p)-[:FRIEND]-(p1:Person) WHERE ID(p) = ${v1.int(req.params.idEntity)} RETURN p1`)
      .then(friends => {
        return res.status(200).json({ data: friends.records.map(element => element.get(0)) });
      });
  }

  private static getFriendsRequest(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers["authorization"], neo4j).then(resultat => {
      neo4j.session
        .run(`MATCH (p:Person), (p)<-[:FRIENDREQUEST]-(p1:Person) WHERE ID(p) = ${resultat.id} RETURN p1`)
        .then(friends => {
          return res.status(200).json({ data: friends.records.map(element => element.get(0)) });
        });
    });
  }

  private static create(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(`CREATE (p:Person { email: "${req.body.email}", password: "${req.body.password}", 
        firstName: "${req.body.firstName}", name: "${req.body.name}" }) RETURN p`)
      .then(person => {
        Token.add(person.records[0].get(0).identity, person.records[0].get(0).labels[0], neo4j).then(token => {
          return res.status(200).json({ token: token });
        });
      });
  }
}
