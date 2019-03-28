import { Entreprise } from "./entity/Entreprise";
import { Skill } from "./trait/Skill";
import { Router, Express } from "express";
import { Neo4j } from "../neo4j";

export class Job {

    public entreprise: Entreprise;
    public description: string;
    public salaire: number;
    public entitled: string;
    public skills: Skill[];

    constructor() { }

    public static mountRoutes(express: Express, neo4j: Neo4j) {
        const router: Router = Router();
        router.post('/job/:idEntreprise', (req, res) => { return Job.add(req, res); });
        router.get('/job/:idEntreprise', (req, res) => { return Job.get(req, res); });
        router.delete('/job:idJob/:idEntreprise', (req, res) => { return Job.delete(req, res); });
        express.use('/', router);
    }

    private static add(req: any, res: any) {
        console.log('** Ajout Job **');
    }

    private static get(req: any, res: any) {
        console.log('** Obtention Job **');
    }

    private static delete(req: any, res: any) {
        console.log('** Supression Job **');
    }
    
}