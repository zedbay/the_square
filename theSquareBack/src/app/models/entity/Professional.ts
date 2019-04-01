import { Person } from "./Person";
import { Token } from "../Token";
import { Neo4j } from "../../neo4j";
import { Router, Express } from "express";

export class Professional {
  public followers: Person[];
  public description: string;

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    const router = Router();
    router.post("/:typeProfessional", (req, res) => {
      return Professional.create(req, res, neo4j);
    });
    express.use("/", router);
  }

  private static create(req: any, res: any, neo4j: Neo4j) {
    if (
      req.params.typeProfessional != "School" &&
      req.params.typeProfessional != "Entreprise"
    ) {
      return res.status(404).json();
    }
    neo4j.session
      .run(
        `CREATE (p:${
          req.params.typeProfessional
        } { email: $email, password: $password, description: $description, name: $nom }) RETURN p`,
        {
          email: req.body["email"],
          password: req.body["password"],
          description: req.body["description"],
          nom: req.body["nom"]
        }
      )
      .then(professional => {
        neo4j.session.close();
        neo4j.driver.close();
        Token.add(
          professional.records[0].get(0).identity,
          professional.records[0].get(0).labels[0],
          neo4j
        ).then(token => {
          return res.status(200).json({ token: token });
        });
      });
  }
}
