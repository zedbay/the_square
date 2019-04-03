import { Lived } from "./Lived";
import { Token } from "../Token";
import { Express, Router } from "express";
import { Neo4j } from "../../neo4j";

export class Formation {
  public static mountRoutes(expres: Express, neo4j: Neo4j) {
    const router: Router = Router();
    router.post("/formation/:token", (req, res) => {
      this.create(req, res, neo4j);
    });
    router.get("/formation/:token", (req, res) => {
      this.get(req, res, neo4j);
    });
    router.delete("/formation/:entitled/:token", (req, res) => {
      this.delete(req, res, neo4j);
    });
    expres.use("/", router);
  }

  private static create(req: any, res: any, neo4j: Neo4j) {
    console.log("création");
  }

  private static get(req: any, res: any, neo4j: Neo4j) {
    console.log("accès");
  }

  private static delete(req: any, res: any, neo4j: Neo4j) {
    console.log("suppresion");
  }
}
