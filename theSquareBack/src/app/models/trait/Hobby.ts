import { Express, Router } from "express";
import { Neo4j } from "../../neo4j";
import { Token } from "../Token";

export class Hobby {
  public entitled: string;

  constructor(entitled: string) {
    this.entitled = entitled;
  }

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    const router: Router = Router();
    router.post("/Hobby/:entitled/:token", (req, res) => {
      return Hobby.add(req, res, neo4j);
    });
    router.get("/Hobby/:token", (req, res) => {
      return Hobby.get(req, res, neo4j);
    });
    router.get("/Hobby", (req, res) => {
      return Hobby.getHobbies(req, res, neo4j);
    });
    router.delete("/Hobby/:entitled/:token", (req, res) => {
      return Hobby.delete(req, res, neo4j);
    });
    express.use("/", router);
  }

  private static add(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.params.token, neo4j).then(resultat => {
      return neo4j.session
        .run(
          `MATCH (e:Person),(h:Hobby { entitled: $entitled }) WHERE ID(e) = $idPerson CREATE (e)-[:LOVE]->(h)`,
          {
            idPerson: resultat.id,
            entitled: req.params.entitled
          }
        )
        .then(() => {
          return res.status(204).json({});
        });
    });
  }

  private static get(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.params.token, neo4j).then(resultat => {
      return neo4j.session
        .run(
          `MATCH (e:Person)-[:LOVE]->(h:Hobby) WHERE ID(e) = $idPerson RETURN h`,
          {
            idPerson: resultat.id
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

  private static getHobbies(req: any, res: any, neo4j: Neo4j) {
    neo4j.session.run(`MATCH (h:Hobby) RETURN h`).then(retour => {
      const tmp = [];
      for (let i = 0; i < retour.records.length; i++) {
        tmp.push(retour.records[i].get(0));
      }
      return res.status(200).json({ data: tmp });
    });
  }

  private static delete(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.params.token, neo4j).then(resultat => {
      return neo4j.session
        .run(
          `MATCH (e:Person)-[r:LOVE]->(h:Hobby { entitled: $entitled }) WHERE ID(e) = $idPerson DETACH DELETE r`,
          {
            idPerson: resultat.id,
            entitled: req.params.entitled
          }
        )
        .then(() => {
          return res.status(200).json({ success: true });
        });
    });
  }
}
