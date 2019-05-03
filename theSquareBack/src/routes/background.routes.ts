import { Router, Express } from "express";
import { ExperienceHandler } from '../handlers/background/experience.handler';
import { FormationHandler } from '../handlers/background/formation.handler';
import { checkJwt } from '../security/checkJwt.middleware';

export class BackgroundRoutes {

	public static init(express: Express) {
		const router: Router = Router();
		BackgroundRoutes.mountPrivateRoutes(router);
		BackgroundRoutes.mountPublicRoutes(router);
		express.use('/', router);
	}

	private static mountPublicRoutes(router: Router) {
		router.get('/experience/person/:idPerson', (req, res) => {
			ExperienceHandler.get(req, res);
		});
		router.get('/formation/person/:idPerson', (req, res) => {
			FormationHandler.get(req, res);
		});	
	}

	private static mountPrivateRoutes(router: Router) {
		router.post('/experience', checkJwt, (req, res) => {
			ExperienceHandler.create(req, res);
		});
		router.delete('/experience/:entitled', checkJwt, (req, res) => {
			ExperienceHandler.delete(req, res);
		});
		router.post('/formation', checkJwt, (req, res) => {
			FormationHandler.create(res, res);
		});
		router.delete('/formation/:entitled', checkJwt, (req, res) => {
			FormationHandler.delete(res, res);
		});
	}
}