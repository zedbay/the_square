import { Express, Router } from "express";
import { Neo4j } from "../../neo4j";
import { v1 } from "neo4j-driver";
import { Token } from "../Token";

export class Formation {
  public static mountRoutes(expres: Express, neo4j: Neo4j) {
    const router: Router = Router();
    router.post("/", (req, res) => {
      this.create(req, res, neo4j);
    });
    router.get("/person/:idPerson", (req, res) => {
      this.get(req, res, neo4j);
    });
    router.delete("/:entitled", (req, res) => {
      this.delete(req, res, neo4j);
    });
    expres.use("/formation", router);
  }

  private static create(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers["authorization"], neo4j).then(resultat => {
      neo4j.session
        .run(`MATCH (e:${resultat.type}), (s:School { name: "${req.body.school}" }) WHERE ID(e) = ${resultat.id}
          CREATE (f:Formation { entitled: "${req.body.entitled}", description: "${req.body.description}", endDate: "${req.body.endDate}", 
          startDate: "${req.body.startDate}" }), (e)-[:STUDY]->(f), (f)-[:IN]->(s) RETURN f`)
        .then((formation) => {
          return res.status(201).json({ data: formation.records[0].get(0).properties });
        });
    });
  }

  private static get(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(`MATCH (p:Person)-[:STUDY]->(f:Formation) WHERE ID(p) = ${v1.int(req.params.idPerson)} RETURN f`)
      .then(retour => {
        return res.status(200).json({ data: retour.records.map(element => element.get(0)) });
      });
  }

  private static delete(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers["authorization"], neo4j).then(resultat => {
      neo4j.session
        .run(`MATCH (e:${resultat.type})-[s:STUDY]->(f:Formation { entitled: "${req.params.entitled}" }) WHERE ID(e) = ${resultat.id} DETACH DELETE f`)
        .then(() => {
          return res.status(200).json({});
        });
    });
  }
}
