import { Router, Express } from "express";
import { Security } from '../security/security';
import { EntityHandler } from '../handlers/entity/entity.handler';
import { EntrepriseHandler } from '../handlers/entity/entreprise.handler';
import { SchoolHandler } from '../handlers/entity/school.handler';
import { checkJwt } from '../security/checkJwt.middleware';
import { PersonHandler } from '../handlers/entity/person.handler';

export class EntityRoutes {

    public static init(express: Express) {
        const router: Router = Router();
        EntityRoutes.mountPrivateRoutes(router);
        EntityRoutes.mountPublicRoutes(router);
        express.use('/', router);
    }

    private static mountPublicRoutes(router: Router) {
        router.post('/login', (req, res) => {
            Security.login(req, res);
        });
        router.get('/entity/:idEntity/', (req, res) => {
            EntityHandler.get(req, res);
        });
        router.post('/search', (req, res) => {
            EntityHandler.search(req, res);
        });
        router.post('/entreprise', (req, res) => {
            EntrepriseHandler.create(req, res);
        });
        router.get('/entreprise', (req, res) => {
            EntrepriseHandler.getAll(req, res);
        });
        router.get('/entreprise/followers/:idEntreprise', (req, res) => {
            EntrepriseHandler.getFollowers(req, res);
        });
        router.get("/entreprise/employes /:idEntreprise", (req, res) => {
            EntrepriseHandler.getEmployes(req, res);
        });
        router.get("/entreprise/jobs/:idEntreprise", (req, res) => {
            EntrepriseHandler.getJobs(req, res);
        });
        router.get('/entreprise/person/:idPerson', (req, res) => {
            EntrepriseHandler.getEntrepriseForPerson(req, res);
        });
        router.post("/school", (req, res) => {
            SchoolHandler.create(req, res);
        });
        router.get("/school", (req, res) => {
            SchoolHandler.getAll(req, res);
        });
        router.get("/school/followers/:idSchool", (req, res) => {
            SchoolHandler.getFollowers(req, res);
        });
        router.get("/school/students/:idSchool", (req, res) => {
            SchoolHandler.getStudents(req, res);
        });
        router.post("/person", (req, res) => {
            PersonHandler.create(req, res);
        });
        router.get("/person/friends/:idEntity", (req, res) => {
            PersonHandler.getFriends(req, res);
        });
    }

    private static mountPrivateRoutes(router: Router) {
        router.get("/person/friendsRequest", checkJwt, (req, res) => {
            PersonHandler.getFriendsRequest(req, res);
        });
        router.get('/person/inCommon/:idPerson', checkJwt, (req, res) => {
            PersonHandler.getFriendsInCommon(req, res);
        });
        router.get('/person/friendSuggestion', checkJwt, (req, res) => {
            PersonHandler.getFriendSuggestion(req, res);
        });
        router.post("/person/friendsRequest", checkJwt, (req, res) => {
            PersonHandler.addFriendsRequest(req, res);
        });
        router.post("/person/responseFriendRequest", checkJwt, (req, res) => {
            PersonHandler.responseFriendRequest(req, res);
        });
        router.post("/person/follow", checkJwt, (req, res) => {
            PersonHandler.follow(req, res);
        });
        router.get("/person/follow", checkJwt, (req, res) => {
            PersonHandler.getFollow(req, res);
        });
        router.delete("/person/follow/:idEntity", checkJwt, (req, res) => {
            PersonHandler.deleteFollow(req, res);
        });
    }
}