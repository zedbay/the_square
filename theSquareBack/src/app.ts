import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as config from '../config.json';
import { Neo4j } from "./neo4j";
import { TheSquareRouter } from './routes/main.routes';

class App {

  public express: express.Express = express();
  public neo4j: Neo4j = new Neo4j();
  public router: TheSquareRouter;

  constructor() {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.router = new TheSquareRouter(this.express);
  }

}

const app = new App().express;
process.setMaxListeners(100);
app.listen(config['port'], () => {
    console.log(`Server running on port ${config['port']}`);
});
