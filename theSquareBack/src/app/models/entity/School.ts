import { Person } from "./Person";
import { Router, Express } from "express";
import { Neo4j } from "../../neo4j";
import { Token } from "../Token";

export class School {
  public students: Person[];
  public followers: Person[];
  public description: string;

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    const router = Router();
    router.post("/", (req, res) => {
      return School.create(req, res, neo4j);
    });
    router.get("/", (req, res) => {
      return School.getAll(req, res, neo4j);
    });
    router.get("/follower/:idEntreprise", (req, res) => {
      return School.getFollowers(req, res, neo4j);
    });
    express.use("/school", router);
  }

  private static getFollowers(req: any, res: any, neo4j: Neo4j) {
    console.log("Accès aux followers d'une école");
  }

  private static getAll(req: any, res: any, neo4j: Neo4j) {
    return neo4j.session.run(`MATCH (s:School) RETURN s`).then(retour => {
      return res.status(200).json({ data: retour.records.map(element => element.get(0)) });
    });
  }

  private static create(req: any, res: any, neo4j: Neo4j) {
    console.log("Création d'une école");
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
