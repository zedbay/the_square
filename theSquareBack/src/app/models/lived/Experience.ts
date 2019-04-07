import { Express, Router } from "express";
import { Neo4j } from "../../neo4j";
import { Token } from "../Token";
import { v1 } from "neo4j-driver";

export class Experience {
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
    expres.use("/experience", router);
  }

  private static create(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers["authorization"], neo4j).then(resultat => {
      neo4j.session
        .run(`MATCH (e:${resultat.type}), (en:Entreprise { name: "${req.body.entreprise}" }) WHERE ID(e) = ${resultat.id}
          CREATE (ex:Experience { entitled: "${req.body.entitled}", description: "${req.body.description}", endDate: "${req.body.endDate}", 
          startDate: "${req.body.startDate}" }), (e)-[:DO]->(ex), (ex)-[:IN]->(en) RETURN ex`)
        .then((experience) => {
          return res.status(201).json({ data: experience.records[0].get(0).properties });
        });
    });
  }

  private static get(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(`MATCH (p:Person)-[:DO]->(e:Experience) WHERE ID(p) = ${v1.int(req.params.idPerson)} RETURN e`)
      .then((experiences) => {
        return res.status(200).json({ data: experiences.records.map(element => element.get(0)) });
      })
  }

  private static delete(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers["authorization"], neo4j).then(resultat => {
      neo4j.session
        .run(`MATCH (p:Person)-[r:DO]->(e:Experience { entitled: "${req.params.entitled}" }) WHERE ID(p) = ${resultat.id} DETACH DELETE r`)
        .then(() => {
          return res.status(200).json({});
        });
    });
  }
}
