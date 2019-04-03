import { Entreprise } from "./entity/Entreprise";
import { Skill } from "./trait/Skill";
import { Router, Express } from "express";
import { Neo4j } from "../neo4j";
import { v1 } from "neo4j-driver";

export class Job {
  public entreprise: Entreprise;
  public description: string;
  public salary: number;
  public entitled: string;
  public skills: Skill[];

  constructor() {}

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
    console.log("Ajout d'un job");
    neo4j.session
      .run(
        `MATCH (e:Entreprise) WHERE ID(e) = $idEntreprise CREATE (j:Job { description: $description, salary: $salary, entitled: $entitled }), (e)-[:OFFER]->(j) RETURN j`,
        {
          description: req.body.description,
          salary: v1.int(req.body.salary),
          entitled: req.body.entitled,
          idEntreprise: v1.int(req.params.idEntreprise)
        }
      )
      .then(result => {
        neo4j.session
          .run(
            `WITH $skills AS skills UNWIND skills AS skill MATCH (s:Skill), (j:Job) WHERE ID(s) = skill AND ID(j) = $idJob CREATE (j)-[:HAVENEED]->(s)`,
            {
              skills: req.body.skills.map(element => v1.int(element)),
              idJob: result.records[0].get(0).identity
            }
          )
          .then(() => {
            neo4j.session.close();
            neo4j.driver.close();
            return res.status(204).json({});
          });
      });
  }

  private static get(req: any, res: any, neo4j: Neo4j) {
    console.log("Accès aux job de la bdd");
    neo4j.session
      .run(
        "MATCH (e:Entreprise)-[:OFFER]->(j:Job) WHERE ID(e) = $idEntreprise RETURN j",
        {
          idEntreprise: v1.int(req.params.idEntreprise)
        }
      )
      .then(result => {
        neo4j.session.close();
        neo4j.driver.close();
        return res.status(200).json({ data: result.records });
      });
  }

  private static delete(req: any, res: any, neo4j: Neo4j) {
    console.log("Suppresion d'un job");
    neo4j.session
      .run("MATCH (j:Job) WHERE ID(j) = $idJob DETACH DELETE j", {
        idJob: v1.int(req.params.idJob)
      })
      .then(() => {
        neo4j.session.close();
        neo4j.driver.close();
        return res.status(200).json({});
      });
  }
}
