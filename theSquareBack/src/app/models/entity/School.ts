import { Person } from "./Person";
import { Router, Express } from "express";
import { Neo4j } from "../../neo4j";
import { Token } from "../Token";

export class School {
  public students: Person[];

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    const router = Router();
    router.post("/school", (req, res) => {
      return School.create(req, res, neo4j);
    });
    router.get("/school", (req, res) => {
      return School.getAll(req, res, neo4j);
    });
    express.use("/", router);
  }

  private static getAll(req: any, res: any, neo4j: Neo4j) {
    return neo4j.session.run(`MATCH (s:School) RETURN s`).then(retour => {
      const tmp = [];
      for (let i = 0; i < retour.records.length; i++) {
        tmp.push(retour.records[i].get(0));
      }
      return res.status(200).json({ data: tmp });
    });
  }

  private static create(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(
        `CREATE (s:School { email: $email, password: $password, description: $description, name: $nom }) RETURN s`,
        {
          email: req.body["email"],
          password: req.body["password"],
          description: req.body["description"],
          nom: req.body["nom"]
        }
      )
      .then(school => {
        neo4j.session.close();
        neo4j.driver.close();
        Token.add(
          school.records[0].get(0).identity,
          school.records[0].get(0).labels[0],
          neo4j
        ).then(token => {
          return res.status(200).json({ token: token });
        });
      });
  }
}
