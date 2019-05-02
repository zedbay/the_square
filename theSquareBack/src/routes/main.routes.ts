import { Router, Express } from "express";
import { BackgroundRoutes } from "./background.routes";
import { EntityRoutes } from "./entity.routes";
import { TraitRoutes } from './trait.routes';
import { JobRoutes } from './job.routes';

export class TheSquareRouter {

    constructor(express: Express) { 
        const router: Router = Router();
        router.get('/isAlive', (_, res) => {
            return res.status(200).json({ isAlive : true });
        });
        express.use("/", router);
        BackgroundRoutes.init(express);
        EntityRoutes.init(express);
        TraitRoutes.init(express);
        JobRoutes.init(express);
    }

}