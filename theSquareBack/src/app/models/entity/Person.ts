import { Experience } from "../lived/Experience";
import { Formation } from "../lived/Formation";
import { Skill } from "../trait/Skill";
import { Hobby } from "../trait/Hobby";
import { Professional } from "./Professional";
import { Neo4j } from "../../neo4j";
import { Router, Express } from "express";
import { Token } from "../Token";

export class Person {
  public firstName: string;
  public experiences: Experience[];
  public formations: Formation[];
  public skills: Skill[];
  public hobbies: Hobby[];
  public friends: Person[];
  public friendsRequest: Person[];
  public follows: Professional[];
  public entitled: string;

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    const router = Router();
    router.post("/Person", (req, res) => {
      return Person.create(req, res, neo4j);
    });
    express.use("/", router);
  }

  private static create(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(
        `CREATE (p:Person { email: $email, password: $password, prenom: $prenom, name: $nom }) RETURN p`,
        {
          email: req.body["email"],
          password: req.body["password"],
          prenom: req.body["prenom"],
          nom: req.body["nom"]
        }
      )
      .then(person => {
        neo4j.session.close();
        neo4j.driver.close();
        Token.add(
          person.records[0].get(0).identity,
          person.records[0].get(0).labels[0],
          neo4j
        ).then(token => {
          return res.status(200).json({ token: token });
        });
      });
  }
}
