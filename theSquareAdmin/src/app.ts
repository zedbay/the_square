import * as express from 'express';
import { Router } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as config from '../config.json';
import { AdminRouter } from './routes/admin.routes';

class App {

    public express: express.Express = express();
    public router: AdminRouter = new AdminRouter(this.express);

    constructor() {
        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.mountRoutes();
    }

    private mountRoutes() {
        const router: Router = Router();
        router.get('/isAlive', (req, res) => {
            res.status(200).json({ isAlive: true });
        });
        this.express.use(router);
    }
}

const app = new App().express;
app.listen(config['port'], () => {
    console.log(`Server running on port ${config['port']}`);
});