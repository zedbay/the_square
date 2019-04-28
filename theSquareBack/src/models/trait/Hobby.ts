import { Express, Router } from "express";
import { Neo4j } from "../../neo4j";
import { Token } from "../Token";
import { v1 } from "neo4j-driver";

export class Hobby {
  public entitled: string;

  constructor(entitled: string) {
    this.entitled = entitled;
  }

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    const router: Router = Router();
    router.post("/", (req, res) => {
      return Hobby.add(req, res, neo4j);
    });
    router.get("/person/:idPerson", (req, res) => {
      return Hobby.get(req, res, neo4j);
    });
    router.get("/", (req, res) => {
      return Hobby.getHobbies(req, res, neo4j);
    });
    router.delete("/:entitled", (req, res) => {
      return Hobby.delete(req, res, neo4j);
    });
    express.use("/hobby", router);
  }

  private static add(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers["authorization"], neo4j).then(resultat => {
      neo4j.session
        .run(`MATCH (e:Person),(h:Hobby { entitled: "${req.body.entitled}" }) WHERE ID(e) = ${resultat.id} CREATE (e)-[:LOVE]->(h)`)
        .then(() => { return res.status(204).json({}); });
    });
  }

  private static get(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(`MATCH (e:Person)-[:LOVE]->(h:Hobby) WHERE ID(e) = ${v1.int(req.params.idPerson)} RETURN h`)
      .then(retour => {
        return res.status(200).json({ data: retour.records.map(element => element.get(0)) });
      });
  }

  private static getHobbies(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(`MATCH (h:Hobby) RETURN h`)
      .then(retour => {
        return res.status(200).json({ data: retour.records.map(element => element.get(0)) });
      });
  }

  private static delete(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers["authorization"], neo4j).then(resultat => {
      neo4j.session
        .run(`MATCH (e:Person)-[r:LOVE]->(h:Hobby { entitled: "${req.params.entitled}" }) WHERE ID(e) = ${resultat.id} DETACH DELETE r`)
        .then(() => { return res.status(200).json({}); });
    });
  }
}
