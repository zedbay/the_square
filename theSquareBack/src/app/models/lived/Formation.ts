import { Token } from "../Token";
import { Express, Router } from "express";
import { Neo4j } from "../../neo4j";

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
    console.log("Création d'une formation");
  }

  private static get(req: any, res: any, neo4j: Neo4j) {
    console.log("Accès aux formations d'un utilisateur");
  }

  private static delete(req: any, res: any, neo4j: Neo4j) {
    console.log("Suppresion d'une formation");
  }
}
