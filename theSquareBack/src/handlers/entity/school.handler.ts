import { Neo4j } from "../../neo4j";
import { v1 } from "neo4j-driver";
import { Security } from "../../security/security";

export class SchoolHandler {

    public static getFollowers(req: any, res: any) {
        const request = `MATCH (p:Person)-[:FOLLOW]->(s:School) WHERE ID(s) = ${v1.int(req.params.idSchool)} RETURN p`;
        Neo4j.execute(request).then(followers => {
            return res.status(200).json({ data: followers.records.map(element => element.get(0)) });
        });
    }

    public static getStudents(req: any, res: any) {
        const request = `MATCH (p:Person)-[:STUDYIN]->(s:School) WHERE ID(s) = ${v1.int(req.params.idSchool)} RETURN p`;
        Neo4j.execute(request).then(students => {
            return res.status(200).json({ data: students.records.map(element => element.get(0)) });
        });
    }

    public static getAll(req: any, res: any) {
        const request = `MATCH (s:School) RETURN s`;
        Neo4j.execute(request).then(schools => {
            return res.status(200).json({ data: schools.records.map(element => element.get(0)) });
        });
    }

    public static create(req: any, res: any) {
        const request = `CREATE (s:School { email: "${req.body.email}", password: "${req.body.password}", 
            description: "${req.body.description}", name: "${req.body.name}" }) RETURN s`;
        Neo4j.execute(request).then(school => {
            Security.login(req, res);
        });
    }
}