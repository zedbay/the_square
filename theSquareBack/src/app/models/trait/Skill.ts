import { Router, Express } from "express";
import { Neo4j } from "../../neo4j";
import { Token } from "../Token";
import { v1 } from "neo4j-driver";

export class Skill {
  public entitled: string;

  constructor(entitled: string) {
    this.entitled = entitled;
  }

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    const router: Router = Router();
    router.post("/", (req, res) => {
      return Skill.add(req, res, neo4j);
    });
    router.get("/:typeEntity/:idEntity", (req, res) => {
      return Skill.get(req, res, neo4j);
    });
    router.get("/", (req, res) => {
      return Skill.getSkills(req, res, neo4j);
    });
    router.delete("/:entitled", (req, res) => {
      return Skill.delete(req, res, neo4j);
    });
    express.use("/skill", router);
  }

  private static delete(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers["authorization"], neo4j).then(resultat => {
      neo4j.session
        .run(`MATCH (e:${resultat.type})-[r:HAVENEED]->(s:Skill { entitled: "${req.params.entitled}" }) WHERE ID(e) = ${resultat.id} DETACH DELETE r`)
        .then(() => {
          return res.status(200).json({});
        });
    });
  }

  private static add(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers["authorization"], neo4j).then(resultat => {
      neo4j.session
        .run(`MATCH (e:${resultat.type}),(s:Skill { entitled: "${req.body.entitled}" }) WHERE ID(e) = ${resultat.id} CREATE (e)-[:HAVENEED]->(s)`)
        .then(() => {
          return res.status(204).json({});
        });
    });
  }

  private static getSkills(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(`MATCH (s:Skill) RETURN s`)
      .then(retour => {
        return res.status(200).json({ data: retour.records.map(element => element.get(0)) });
      });
  }

  private static get(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(`MATCH (e:${req.params.typeEntity})-[:HAVENEED]->(s:Skill) WHERE ID(e) = ${v1.int(req.params.idEntity)} RETURN s`)
      .then(retour => {
        return res.status(200).json({ data: retour.records.map(element => element.get(0)) });
      });
  }

}
