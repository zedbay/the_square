import { Token } from "../Token";
import { Activity } from "../trait/Activity";
import { Neo4j } from "../../neo4j";
import { Router, Express } from "express";
import { Person } from "./Person";
import { Entreprise } from "./Entreprise";
import { School } from "./School";

export class Entity {
  public password: string;
  public currentToken: Token;
  public email: string;
  public name: string;
  public activitys: Activity[];

  constructor() {}

  public static mountRoutes(express: Express, neo4j: Neo4j) {
    const router = Router();
    router.post("/login", (req, res) => {
      return Entity.login(req, res, neo4j);
    });
    router.get("/entity", (req, res) => {
      return Entity.get(req, res, neo4j);
    });
    router.post("/follow", (req, res) => {
      return Entity.follow(req, res, neo4j);
    });
    express.use("/", router);
    School.mountRoutes(express, neo4j);
    Person.mountRoutes(express, neo4j);
    Entreprise.mountRoutes(express, neo4j);
  }

  private static follow(req: any, res: any, neo4j: Neo4j) {
    console.log("Follow d'une entité par un utilsateur");
  }

  private static login(req: any, res: any, neo4j: Neo4j) {
    console.log("Un utilisateur tente de se connecter");
    neo4j.session
      .run(`MATCH (a { email: "${ req.body.email }", password: "${ req.body.password }" }) RETURN a`)
      .then((result) => {
        if (!result.records[0]) {
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

  private static get(req: any, res: any, neo4j: Neo4j) {
    console.log(req.headers['authorization']);
    // return Token.get(req.params.token, neo4j).then(resultat => {
    //   return neo4j.session
    //     .run(`MATCH (e:${resultat.type}) WHERE ID(e) = $idPerson RETURN e`, {
    //       idPerson: resultat.id
    //     })
    //     .then(retour => {
    //       return res.status(200).json({ data: retour.records[0].get(0) });
    //     });
    // });
  }
}
