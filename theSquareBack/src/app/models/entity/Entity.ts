
import { Token } from '../Token';
import { Activity } from '../trait/Activity';
import { Neo4j } from '../../neo4j';
import { Router, Express } from "express";

export class Entity {

    public password: string;
    public currentToken: Token;
    public email: string;
    public name: string;
    public activitys: Activity[];

    constructor(value: Object) {
        value['password'] ? this.password = value['password'] : this.password = undefined;
        value['currentToken'] ? this.currentToken = value['currentToken'] : this.currentToken = undefined;
        value['email'] ? this.email = value['email'] : this.email = undefined;
        value['name'] ? this.name = value['name'] : this.name = undefined;
    }

    public static mountRoutes(express: Express, neo4j: Neo4j) {
        const router = Router();
        router.get('/login', (req, res) => { return Entity.login(req, res, neo4j); });
        router.post('/create/user', (req, res) => { return Entity.createEntity(req, res, neo4j); });
        express.use('/', router);
    }

    private static createEntity(req: any, res: any, neo4j: Neo4j) {
        console.log('*** Création d\'un utilisateur ***');
        neo4j.session.run(
            "CREATE (:Person { email: $email, password: $password, prenom: $prenom, name: $nom })",
            { 
                email: req.body['email'],
                password: req.body['password'],
                prenom: req.body['prenom'],
                nom: req.body['nom']
            }
        ).then(() => { 
            neo4j.session.close(); 
            neo4j.driver.close(); 
            return (res.status(200).json({ success: true }));
        });  
    }

    private static login(req: any, res: any, neo4j: Neo4j) {
        console.log('** Tentative de connexion **');
        neo4j.session.run(
            "MATCH (a:Person { email: $email, password: $password }) RETURN a",
            {
                email: req.body['email'],
                password: req.body['password']
            }
        ).then(function (result) {
            neo4j.session.close();
            neo4j.driver.close();
            if (result.records[0] === undefined) {
                console.log('*** connexion refusé ***');
                return res.status(200).json({ success: false });
            } else {
                console.log('*** connexion authorisé ***');
                return res.status(200).json({ test: result.records[0].get(0).properties, success: true });
            }
        });
    }
}