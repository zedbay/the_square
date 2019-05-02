import { Neo4j } from "../../neo4j";
import { v1 } from "neo4j-driver";
import { Security } from "../../security/security";

export class EntrepriseHandler {

    public static getEntrepriseForPerson(req: any, res: any) {
        const request = `MATCH (p:Person)-[:WORKIN]->(e:Entreprise) WHERE ID(p) = ${v1.int(req.params.idPerson)} RETURN e`;
        Neo4j.execute(request).then(entreprise => {
            return res.status(200).json({ data: entreprise.records[0].get(0) });
        });
    }

    public static getJobs(req: any, res: any) {
        const request = `MATCH (e:Entreprise)-[:OFFER]->(j:Job) WHERE ID(e) = ${v1.int(req.params.idEntreprise)} RETURN j`;
        Neo4j.execute(request).then(jobs => {
            return res.status(200).json({ data: jobs.records.map(element => element.get(0)) });
        });
    }

    public static getFollowers(req: any, res: any) {
        const request = `MATCH (p:Person)-[:FOLLOW]->(e:Entreprise) WHERE ID(e) = ${v1.int(req.params.idEntreprise)} RETURN p`;
        Neo4j.execute(request).then(followers => {
            return res.status(200).json({ data: followers.records.map(element => element.get(0)) });
        });
    }

    public static getEmployes(req: any, res: any) {
        const request = `MATCH (p:Person)-[:WORKIN]-(e:Entreprise) WHERE ID(e) = ${v1.int(req.params.idEntreprise)} RETURN p`;
        Neo4j.execute(request).then(employes => {
            return res.status(200).json({ data: employes.records.map(element => element.get(0)) });
        });
    }

    public static getAll(req: any, res: any) {
        const request = `MATCH (e:Entreprise) RETURN e`;
        Neo4j.execute(request).then(entreprises => {
            return res.status(200).json({ data: entreprises.records.map(element => element.get(0)) });
        });
    }

    public static create(req: any, res: any) {
        const request = `CREATE (e:Entreprise { email: "${req.body.email}", password: "${req.body.password}", 
            description: "${req.body.description}", name: "${req.body.name}" }) RETURN e`;
        Neo4j.execute(request).then(entreprise => {
            return Security.login(req, res);
        });
    }
}