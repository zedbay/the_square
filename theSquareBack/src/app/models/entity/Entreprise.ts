import { Router, Express } from "express";
import { Job } from "../Job";
import { Person } from "./Person";
import { Token } from "../Token";
import { Neo4j } from "../../neo4j";

export class Entreprise {
  public jobs: Job[];
  public employes: Person[];
  public followers: Person[];
  public description: string;

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    const router = Router();
    router.post("/", (req, res) => {
      return Entreprise.create(req, res, neo4j);
    });
    router.get("/:idEntreprise", (req, res) => {
      return Entreprise.getAll(req, res, neo4j);
    });
    router.get("/follower/:idEntreprise", (req, res) => {
      return Entreprise.getFollowers(req, res, neo4j);
    });
    router.get("/employe/:idEntreprise", (req, res) => {
      return Entreprise.getEmployes(req, res, neo4j);
    })
    express.use("/entreprise", router);
  }

  private static getFollowers(req: any, res: any, neo4j: Neo4j) {
    console.log("Accès aux followers d'une entreprise");
  }
  private static getEmployes(req: any, res: any, neo4j: Neo4j) {
    console.log("Accès ux employé d'une entreprise");
  }

  private static getAll(req: any, res: any, neo4j: Neo4j) {
    console.log("Accès aux entreprises de la bdd");
  }

  private static create(req: any, res: any, neo4j: Neo4j) {
    console.log("Création d'une entreprise");
    neo4j.session
      .run(
        `CREATE (e:Entreprise { email: $email, password: $password, description: $description, name: $nom }) RETURN e`,
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
