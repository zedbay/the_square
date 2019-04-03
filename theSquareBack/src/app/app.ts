import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { Neo4j } from "./neo4j";
import { Hobby } from "./models/trait/Hobby";
import { Activity } from "./models/trait/Activity";
import { Skill } from "./models/trait/Skill";
import { Job } from "./models/Job";
import { Entity } from "./models/entity/Entity";
import { Lived } from "./models/lived/Lived";

class App {
  public express: express.Express = express();
  public neo4j: Neo4j = new Neo4j();

  constructor() {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.mountRoutes();
  }

  private mountRoutes() {
    const router: express.Router = express.Router();
    router.get("/", (req, res) => {
      console.log("ping");
      res.json({ message: "pong" });
    });
    this.express.use("/", router);

    Lived.mountRoutes(this.express, this.neo4j);
    Entity.mountRoutes(this.express, this.neo4j);
    Activity.mountRoutes(this.express, this.neo4j);
    Hobby.mountRoutes(this.express, this.neo4j);
    Skill.mountRoutes(this.express, this.neo4j);
    Job.mountRoutes(this.express, this.neo4j);
  }
}

export default new App().express;
