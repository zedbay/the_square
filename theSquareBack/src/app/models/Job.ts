import { Entreprise } from "./entity/Entreprise";
import { Skill } from "./trait/Skill";
import { Router, Express } from "express";
import { Neo4j } from "../neo4j";
import { v1 } from "neo4j-driver";
import { Token } from "./Token";

export class Job {
  public entreprise: Entreprise;
  public description: string;
  public salary: number;
  public entitled: string;
  public skills: Skill[];

  constructor() { }

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    const router: Router = Router();
    router.post("/", (req, res) => {
      return Job.add(req, res, neo4j);
    });
    router.get("/", (req, res) => {
      return Job.get(req, res, neo4j);
    });
    router.delete("/:idJob", (req, res) => {
      return Job.delete(req, res, neo4j);
    });
    express.use("/job", router);
  }

  private static add(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers["authorization"], neo4j).then(entity => {
      neo4j.session
        .run(`MATCH (e:Entreprise) WHERE ID(e) = ${entity.id} 
          CREATE (j:Job { description: "${req.body.description}", salary: "${req.body.salary}", 
          entitled: "${req.body.entitled}" }), (e)-[:OFFER]->(j) RETURN j`)
        .then(result => {
          neo4j.session
            .run(`WITH $skills AS skills UNWIND skills AS skill MATCH (s:Skill), (j:Job) 
            WHERE ID(s) = skill AND ID(j) = $idJob CREATE (j)-[:HAVENEED]->(s)`,
              {
                skills: req.body.skills.map(element => v1.int(element)),
                idJob: result.records[0].get(0).identity
              }
            )
            .then(() => {
              return res.status(204).json({});
            });
        });
    });
  }

  private static get(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run("MATCH (j:Job) RETURN j")
      .then(jobs => {
        return res.status(200).json({ data: jobs.records.map(element => element.get(0)) });
      });
  }

  private static delete(req: any, res: any, neo4j: Neo4j) {
    return Token.get(req.headers["authorization"], neo4j).then(entity => {
      neo4j.session
        .run(`MATCH (e:Entreprise)-[:OFFER]->(j:Job) WHERE ID(e) = ${entity.id} 
          AND ID(j) = ${v1.int(req.params.idJob)} DETACH DELETE j`)
        .then(() => {
          return res.status(200).json({});
        });
    });
  }
}
