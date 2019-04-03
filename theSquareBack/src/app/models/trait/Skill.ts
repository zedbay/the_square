import { Router, Express } from "express";
import { Neo4j } from "../../neo4j";
import { Token } from "../Token";

export class Skill {
  public entitled: string;

  constructor(entitled: string) {
    this.entitled = entitled;
  }

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    const router: Router = Router();
    router.post("/skill/:entitled/:token", (req, res) => {
      return Skill.add(req, res, neo4j);
    });
    router.get("/skill/:token", (req, res) => {
      return Skill.get(req, res, neo4j);
    });
    router.get("/skill", (req, res) => {
      return Skill.getSkills(req, res, neo4j);
    });
    router.delete("/skill/:entitled/:token", (req, res) => {
      return Skill.delete(req, res, neo4j);
    });
    express.use("/", router);
  }

  private static add(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.params.token, neo4j).then(resultat => {
      return neo4j.session
        .run(
          `MATCH (e:${
            resultat.type
          }),(s:Skill { entitled: $entitled }) WHERE ID(e) = $idEntity CREATE (e)-[:HAVENEED]->(s)`,
          {
            idEntity: resultat.id,
            entitled: req.params.entitled
          }
        )
        .then(() => {
          return res.status(204).json({});
        });
    });
  }

  private static getSkills(req: any, res: any, neo4j: Neo4j) {
    return neo4j.session.run(`MATCH (s:Skill) RETURN s`).then(retour => {
      const tmp = [];
      for (let i = 0; i < retour.records.length; i++) {
        tmp.push(retour.records[i].get(0));
      }
      return res.status(200).json({ data: tmp });
    });
  }

  private static get(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.params.token, neo4j).then(resultat => {
      return neo4j.session
        .run(
          `MATCH (e:${
            resultat.type
          })-[:HAVENEED]->(s:Skill) WHERE ID(e) = $idEntity RETURN s`,
          {
            idEntity: resultat.id
          }
        )
        .then(retour => {
          const tmp = [];
          for (let i = 0; i < retour.records.length; i++) {
            tmp.push(retour.records[i].get(0));
          }
          return res.status(200).json({ data: tmp });
        });
    });
  }

  private static delete(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.params.token, neo4j).then(resultat => {
      neo4j.session
        .run(
          `MATCH (e:${
            resultat.type
          })-[r:HAVENEED]->(s:Skill { entitled: $entitled }) WHERE ID(e) = $idEntity DETACH DELETE r`,
          {
            idEntity: resultat.id,
            entitled: req.params.entitled
          }
        )
        .then(() => {
          return res.status(200).json({});
        });
    });
  }
}
