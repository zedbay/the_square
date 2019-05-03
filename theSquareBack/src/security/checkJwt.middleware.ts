import * as jwt from 'jsonwebtoken';
import { NextFunction } from 'connect';
import { Security } from './security';

export const checkJwt = (req, res, next: NextFunction) => {
    const token = <string>req.headers["authorization"];
    try {
        <any>jwt.verify(token, Security.secretKey);
    } catch (error) {
        res.status(401).send();
        return;
    }
    next();
}