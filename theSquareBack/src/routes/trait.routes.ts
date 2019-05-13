import { Router, Express } from "express";
import { checkJwt } from '../security/checkJwt.middleware';
import { SkillHandler } from '../handlers/trait/skill.handler';
import { HobbyHandler } from '../handlers/trait/hobby.handler';
import { ActivityHandler } from '../handlers/trait/activity.handler';

export class TraitRoutes {

    public static init(express: Express) {
        const router: Router = Router();
        TraitRoutes.mountPrivateRoutes(router);
        TraitRoutes.mountPublicRoutes(router);
        express.use('/', router);
    }

    private static mountPublicRoutes(router: Router) {
        router.get('/skill/:idEntity', (req, res) => {
            SkillHandler.get(req, res);
        });
        router.get('/skill', (req, res) => {
            SkillHandler.getSkills(req, res);
        });
        router.get('/hobby', (req, res) => {
            HobbyHandler.getHobbies(req, res);
        });
        router.get('/hobby/person/:idPerson', (req, res) => {
            HobbyHandler.get(req, res);
        });
        router.get('/activity', (req, res) => {
            ActivityHandler.getActivitys(req, res);
        });
        router.get('/activity/:typeEntity/:idEntity', (req, res) => {
            ActivityHandler.get(req, res);
        });
    }

    private static mountPrivateRoutes(router: Router) {
        router.post('/skill', checkJwt, (req, res) => {
            SkillHandler.add(req, res);
        });
        router.delete('/skill/:entitled', checkJwt, (req, res) => {
            SkillHandler.delete(req, res);
        });
        router.post('/hobby', checkJwt, (req, res) => {
            HobbyHandler.add(req, res);
        });
        router.delete('/hobby/:entitled', checkJwt, (req, res) => {
            HobbyHandler.delete(req, res);
        });
        router.post('/activity', checkJwt, (req, res) => {
            ActivityHandler.add(req, res);
        });
        router.delete('/activity/:entitled', checkJwt, (req, res) => {
            ActivityHandler.delete(req, res);
        });
    }
}