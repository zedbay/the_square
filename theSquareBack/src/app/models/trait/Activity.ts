import { Router, Express } from "express";
import { Neo4j } from "../../neo4j";
import { v1 } from "neo4j-driver";

export class Activity {
  public entitled: string;

  constructor(entitled: string) {
    this.entitled = entitled;
  }

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    const router: Router = Router();
    router.post("/Activity/:idActivity/:typeEntity/:idEntity", (req, res) => {
      return Activity.add(req, res, neo4j);
    });
    router.get("/Activity/:typeEntity/:idEntity", (req, res) => {
      return Activity.get(req, res, neo4j);
    });
    router.get("/Activity", (req, res) => {
      return Activity.getActivitys(req, res, neo4j);
    });
    router.delete("/Activity/:idActivity/:typeEntity/:idEntity", (req, res) => {
      return Activity.delete(req, res, neo4j);
    });
    express.use("/", router);
  }

  private static add(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(
        `MATCH (e:${
          req.params.typeEntity
        }),(a:Activity) WHERE ID(e) = $idEntity AND ID(a) = $idActivity CREATE (e)-[:INACTIVITY]->(a)`,
        {
          idEntity: v1.int(req.params.idEntity),
          idActivity: v1.int(req.params.idActivity)
        }
      )
      .then(() => {
        neo4j.session.close();
        neo4j.driver.close();
        return res.status(204).json({});
      });
  }

  private static getActivitys(req: any, res: any, neo4j: Neo4j) {
    neo4j.session.run(`MATCH (a:Activity) RETURN a`).then(retour => {
      neo4j.session.close();
      neo4j.driver.close();
      return res.status(200).json({ data: retour.records });
    });
  }

  private static get(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(
        `MATCH (e:${
          req.params.typeEntity
        })-[:INACTIVITY]->(a:Activity) WHERE ID(e) = $idEntity RETURN a`,
        {
          idEntity: v1.int(req.params.idEntity)
        }
      )
      .then(retour => {
        neo4j.session.close();
        neo4j.driver.close();
        return res
          .status(200)
          .json({ success: true, resultat: retour.records });
      });
  }

  private static delete(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(
        `MATCH (e:${
          req.params.typeEntity
        })-[r:INACTIVITY]->(a:Activity) WHERE ID(e) = $idEntity AND ID(a) = $idActivity DELETE r`,
        {
          idEntity: v1.int(req.params.idEntity),
          idActivity: v1.int(req.params.idActivity)
        }
      )
      .then(() => {
        neo4j.session.close();
        neo4j.driver.close();
        return res.status(200).json({ success: true });
      });
  }
}
