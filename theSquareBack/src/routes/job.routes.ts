import { Router, Express } from "express";
import { checkJwt } from '../security/checkJwt.middleware';
import { JobHandler } from '../handlers/job.handler';

export class JobRoutes {

    public static init(express: Express) {
		const router: Router = Router();
		JobRoutes.mountPrivateRoutes(router);
		JobRoutes.mountPublicRoutes(router);
		express.use('/', router);
	}

	private static mountPublicRoutes(router: Router) {
		router.get('/job', (req, res) => {
            JobHandler.get(req, res);
		});
	}

	private static mountPrivateRoutes(router: Router) {
		router.post('/job', checkJwt, (req, res) => {
            JobHandler.add(req, res);
		});
		router.delete('/job/:idJob', checkJwt, (req, res) => {
            JobHandler.delete(res, res);
		});
	}
}