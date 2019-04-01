import { Router, Express } from "express";
import { Neo4j } from "../../neo4j";
import { v1 } from "neo4j-driver";

export class Skill {
  public entitled: string;

  constructor(entitled: string) {
    this.entitled = entitled;
  }

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    const router: Router = Router();
    router.post("/skill/:idSKill/:typeEntity/:idEntity", (req, res) => {
      return Skill.add(req, res, neo4j);
    });
    router.get("/skill/:typeEntity/:idEntity", (req, res) => {
      return Skill.get(req, res, neo4j);
    });
    router.get("/skill", (req, res) => {
      return Skill.getSkills(req, res, neo4j);
    });
    router.delete("/skill/:idSkill/:typeEntity/:idEntity", (req, res) => {
      return Skill.delete(req, res, neo4j);
    });
    express.use("/", router);
  }

  private static add(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(
        `MATCH (e:${
          req.params.typeEntity
        }),(s:Skill) WHERE ID(e) = $idEntity AND ID(s) = $idSkill CREATE (e)-[:HAVENEED]->(s)`,
        {
          idEntity: v1.int(req.params.idEntity),
          idSkill: v1.int(req.params.idSKill)
        }
      )
      .then(() => {
        neo4j.session.close();
        neo4j.driver.close();
        return res.status(204).json({});
      });
  }

  private static getSkills(req: any, res: any, neo4j: Neo4j) {
    neo4j.session.run(`MATCH (s:Skill) RETURN s`).then(retour => {
      const tmp = [];
      for (let i = 0; i < retour.records.length; i++) {
        tmp.push(retour.records[i].get(0));
      }
      return res.status(200).json({ data: tmp });
    });
  }

  private static get(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(
        `MATCH (e:${
          req.params.typeEntity
        })-[:HAVENEED]->(s:Skill) WHERE ID(e) = $idEntity RETURN s`,
        {
          idEntity: v1.int(req.params.idEntity)
        }
      )
      .then(retour => {
        const tmp = [];
        for (let i = 0; i < retour.records.length; i++) {
          tmp.push(retour.records[i].get(0));
        }
        return res.status(200).json({ data: tmp });
      });
  }

  private static delete(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(
        `MATCH (e:${
          req.params.typeEntity
        })-[r:HAVENEED]->(s:Skill) WHERE ID(e) = $idEntity AND ID(s) = $idSkill DELETE r`,
        {
          idEntity: v1.int(req.params.idEntity),
          idSkill: v1.int(req.params.idSkill)
        }
      )
      .then(() => {
        neo4j.session.close();
        neo4j.driver.close();
        return res.status(200).json({ success: true });
      });
  }
}
