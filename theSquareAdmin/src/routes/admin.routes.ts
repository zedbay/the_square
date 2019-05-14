import { Router, Express } from 'express';
import { AdminHandler } from '../handler/admin.handlers';

export class AdminRouter {

    constructor(express: Express) {
        const router: Router = Router();
        router.get('/isAlive', (req, res) => {
            return res.status(200).json({ isAlive: true });
        });
        AdminRouter.mountRoutes(router);
        express.use("/", router);
    }

    private static mountRoutes(router: Router) {
        router.delete('/entity/:idEntity', (req, res) => {
            AdminHandler.deleteEntity(req, res);
        });
        router.delete('/post/:idPost', (req, res) => {
            AdminHandler.deletePost(req, res);
        });
    }

}