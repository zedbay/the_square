import { Token } from "../Token";
import { Activity } from "../trait/Activity";
import { Neo4j } from "../../neo4j";
import { Router, Express } from "express";
import { Person } from "./Person";
import { Professional } from "./Professional";

export class Entity {
  public password: string;
  public currentToken: Token;
  public email: string;
  public name: string;
  public activitys: Activity[];

  constructor() { }

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    const router = Router();
    router.post("/Login", (req, res) => {
      return Entity.login(req, res, neo4j);
    });
    express.use("/", router);
    Person.mountRoutes(express, neo4j);
    Professional.mountRoutes(express, neo4j);
  }

  private static login(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run("MATCH (a { email: $email, password: $password }) RETURN a", {
        email: req.body["email"],
        password: req.body["password"]
      })
      .then(function (result) {
        neo4j.session.close();
        neo4j.driver.close();
        if (result.records[0] === undefined) {
          return res.status(200).json({ success: false });
        } else {
          Token.add(
            result.records[0].get(0).identity,
            result.records[0].get(0).labels[0],
            neo4j
          ).then(token => {
            return res.status(200).json({ token: token });
          });
        }
      });
  }
}
