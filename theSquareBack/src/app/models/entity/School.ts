import { Person } from "./Person";
import { Router, Express } from "express";
import { Neo4j } from "../../neo4j";
import { Token } from "../Token";
import { v1 } from "neo4j-driver";

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
    router.get("/followers/:idSchool", (req, res) => {
      return School.getFollowers(req, res, neo4j);
    });
    router.get("/students/:idSchool", (req, res) => {
      return School.getStudents(req, res, neo4j);
    });
    express.use("/school", router);
  }

  private static getFollowers(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(`MATCH (p:Person)-[:FOLLOW]->(s:School) WHERE ID(s) = ${v1.int(req.params.idSchool)} RETURN p`)
      .then(followers => {
        return res.status(200).json({ data: followers.records.map(element => element.get(0)) });
      });
  }

  private static getStudents(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
    .run(`MATCH (p:Person)-[:STUDYIN]->(s:School) WHERE ID(s) = ${v1.int(req.params.idSchool)} RETURN p`)
    .then(students => {
      return res.status(200).json({ data: students.records.map(element => element.get(0)) });
    });
  }

  private static getAll(req: any, res: any, neo4j: Neo4j) {
    return neo4j.session.run(`MATCH (s:School) RETURN s`).then(school => {
      return res.status(200).json({ data: school.records.map(element => element.get(0)) });
    });
  }

  private static create(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(`CREATE (s:School { email: "${req.body.email}", password: "${req.body.password}", 
        description: "${req.body.description}", name: "${req.body.name}" }) RETURN s`)
      .then(school => {
        Token.add(school.records[0].get(0).identity, school.records[0].get(0).labels[0], neo4j).then(token => {
          return res.status(200).json({ token: token });
        });
      });
  }
}
