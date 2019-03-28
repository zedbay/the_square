"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class Portail {
    
    static mountRoutes(expressApp) {
        Portail.login(expressApp);
    }
    static login(expressApp) {
        const router = express.Router();
        router.get('/login', (req, res) => {
            res.json({ message: 'login' });
        });
        expressApp.use('/', router);
    }
}
exports.Portail = Portail;
//# sourceMappingURL=portail.js.map