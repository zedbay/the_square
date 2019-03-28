"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const portail_1 = require("./portail");
class App {
    constructor() {
        this.express = express();
        this.mountRoutes();
        portail_1.Portail.mountRoutes(this.express);
    }
    mountRoutes() {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({ message: 'hello world' });
        });
        this.express.use('/', router);
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map