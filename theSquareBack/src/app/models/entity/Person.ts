import { Experience } from "../lived/Experience";
import { Formation } from "../lived/Formation";
import { Skill } from "../trait/Skill";
import { Hobby } from "../trait/Hobby";
import { Neo4j } from "../../neo4j";
import { Router, Express } from "express";
import { Token } from "../Token";
import { Entity } from "./Entity";

export class Person {
  public firstName: string;
  public experiences: Experience[];
  public formations: Formation[];
  public skills: Skill[];
  public hobbies: Hobby[];
  public friends: Person[];
  public friendsRequest: Person[];
  public follows: Entity[];
  public entitled: string;

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    const router = Router();
    router.post("/", (req, res) => {
      return Person.create(req, res, neo4j);
    });
    router.get("/friends/entity/:idEntity", (req, res) => {
      return this.getFriends(req, res, neo4j);
    });
    router.get("/friendsRequest", (req, res) => {
      return this.getFriendsRequest(req, res, neo4j);
    });
    express.use("/person", router);
  }

  private static getFriends(req: any, res: any, neo4j: Neo4j) {
    console.log("Accès a la liste d'amis d'un utilisateur");
  }
  private static getFriendsRequest(req: any, res: any, neo4: Neo4j) {
    console.log("Accès a la liste de requête d'amis d'un utilisateur");
  }

  private static create(req: any, res: any, neo4j: Neo4j) {
    console.log("Création d'un utilisateur");
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
