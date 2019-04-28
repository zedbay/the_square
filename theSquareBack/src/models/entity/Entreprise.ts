import { Router, Express } from "express";
import { Job } from "../Job";
import { Person } from "./Person";
import { Token } from "../Token";
import { Neo4j } from "../../neo4j";
import { v1 } from "neo4j-driver";

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
    router.get("/", (req, res) => {
      return Entreprise.getAll(req, res, neo4j);
    });
    router.get("/followers/:idEntreprise", (req, res) => {
      return Entreprise.getFollowers(req, res, neo4j);
    });
    router.get("/employes /:idEntreprise", (req, res) => {
      return Entreprise.getEmployes(req, res, neo4j);
    });
    router.get("/jobs/:idEntreprise", (req, res) => {
      return Entreprise.getJobs(req, res, neo4j);
    });
    router.get('/person/:idPerson', (req, res) => {
      return Entreprise.getEntrepriseForPerson(req, res, neo4j);
    });
    express.use("/entreprise", router);
  }

  private static getEntrepriseForPerson(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(`MATCH (p:Person)-[:WORKIN]->(e:Entreprise) WHERE ID(p) = ${v1.int(req.params.idPerson)} RETURN e`)
      .then(entreprise => {
        return res.status(200).json({ data: entreprise.records[0].get(0) });
      });
  }

  private static getJobs(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(`MATCH (e:Entreprise)-[:OFFER]->(j:Job) WHERE ID(e) = ${v1.int(req.params.idEntreprise)} RETURN j`)
      .then(jobs => {
        return res.status(200).json({ data: jobs.records.map(element => element.get(0)) });
      });
  }

  private static getFollowers(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(`MATCH (p:Person)-[:FOLLOW]->(e:Entreprise) WHERE ID(e) = ${v1.int(req.params.idEntreprise)} RETURN p`)
      .then(followers => {
        return res.status(200).json({ data: followers.records.map(element => element.get(0)) });
      });
  }

  private static getEmployes(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(`MATCH (p:Person)-[:WORKIN]-(e:Entreprise) WHERE ID(e) = ${v1.int(req.params.idEntreprise)} RETURN p`)
      .then(employe => {
        return res.status(200).json({ data: employe.records.map(element => element.get(0)) });
      });
  }

  private static getAll(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(`MATCH (e:Entreprise) RETURN e`)
      .then(entreprises => {
        return res.status(200).json({ data: entreprises.records.map(element => element.get(0)) });
      });
  }

  private static create(req: any, res: any, neo4j: Neo4j) {
    neo4j.session
      .run(`CREATE (e:Entreprise { email: "${req.body.email}", password: "${req.body.password}", 
        description: "${req.body.description}", name: "${req.body.name}" }) RETURN e`)
      .then(entreprise => {
        Token.add(entreprise.records[0].get(0).identity, entreprise.records[0].get(0).labels[0], neo4j).then(token => {
          return res.status(200).json({ token: token });
        });
      });
  }
}
