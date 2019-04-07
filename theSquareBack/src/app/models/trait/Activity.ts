import { Router, Express } from "express";
import { Neo4j } from "../../neo4j";
import { v1 } from "neo4j-driver";

export class Activity {
  public entitled: string;

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    const router: Router = Router();
    router.post("/", (req, res) => {
      return Activity.add(req, res, neo4j);
    });
    router.get("/:typeEntity/:idEntity", (req, res) => {
      return Activity.get(req, res, neo4j);
    });
    router.get("/", (req, res) => {
      return Activity.getActivitys(req, res, neo4j);
    });
    router.delete("/:entitled", (req, res) => {
      return Activity.delete(req, res, neo4j);
    });
    express.use("/activity", router);
  }

  private static add(req: any, res: any, neo4j: Neo4j) {
    console.log("Ajout d'une activité pour une entité");
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
        return res.status(204).json({});
      });
  }

  private static getActivitys(req: any, res: any, neo4j: Neo4j) {
    console.log("Accès aux activités");
    neo4j.session.run(`MATCH (a:Activity) RETURN a`).then(retour => {
      return res.status(200).json({ data: retour.records });
    });
  }

  private static get(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(`MATCH (e:${req.params.typeEntity})-[:INACTIVITY]->(a:Activity) WHERE ID(e) = ${v1.int(req.params.idEntity)} RETURN a`)
      .then(activity => {
        return res.status(200).json({ data: activity.records[0].get(0) });
      });
  }

  private static delete(req: any, res: any, neo4j: Neo4j) {
    console.log("Supression d'une activité pour une entité");
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
