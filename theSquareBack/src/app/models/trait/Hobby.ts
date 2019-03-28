import { Express, Router } from "express";
import { Neo4j } from "../../neo4j";
import { v1 } from "neo4j-driver";

export class Hobby {
  public entitled: string;

  constructor(entitled: string) {
    this.entitled = entitled;
  }

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    const router: Router = Router();
    router.post("/Hobby/:idHobby/Person/:idPerson", (req, res) => {
      return Hobby.add(req, res, neo4j);
    });
    router.get("/Hobby/Person/:idPerson", (req, res) => {
      return Hobby.get(req, res, neo4j);
    });
    router.get("/Hobby", (req, res) => {
      return Hobby.getHobbies(req, res, neo4j);
    });
    router.delete("/Hobby/:idHobby/Person/:idPerson", (req, res) => {
      return Hobby.delete(req, res, neo4j);
    });
    express.use("/", router);
  }

  private static add(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(
        `MATCH (e:Person),(h:Hobby) WHERE ID(e) = $idPerson AND ID(h) = $idHobby CREATE (e)-[:LOVE]->(h)`,
        {
          idPerson: v1.int(req.params.idPerson),
          idHobby: v1.int(req.params.idHobby)
        }
      )
      .then(() => {
        neo4j.session.close();
        neo4j.driver.close();
        return res.status(200).json({ success: true });
      });
  }

  private static get(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(
        `MATCH (e:Person)-[:LOVE]->(h:Hobby) WHERE ID(e) = $idPerson RETURN h`,
        {
          idPerson: v1.int(req.params.idPerson)
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

  private static getHobbies(req: any, res: any, neo4j: Neo4j) {
    neo4j.session.run(`MATCH (h:Hobby) RETURN h`).then(retour => {
      neo4j.session.close();
      neo4j.driver.close();
      return res.status(200).json({ success: true, resultat: retour.records });
    });
  }

  private static delete(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(
        `MATCH (e:Person)-[r:LOVE]->(h:Hobby) WHERE ID(e) = $idPerson AND ID(h) = $idHobby DELETE r`,
        {
          idPerson: v1.int(req.params.idPerson),
          idHobby: v1.int(req.params.idHobby)
        }
      )
      .then(() => {
        neo4j.session.close();
        neo4j.driver.close();
        return res.status(200).json({ success: true });
      });
  }
}
