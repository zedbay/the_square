import { Router, Express } from "express";
import { checkJwt } from '../security/checkJwt.middleware';
import { PostHandler } from '../handlers/post.handler';

export class PostRoutes {

    public static init(express: Express) {
		const router: Router = Router();
		PostRoutes.mountPrivateRoutes(router);
		PostRoutes.mountPublicRoutes(router);
		express.use('/', router);
	}

	private static mountPublicRoutes(router: Router) {
        router.get('/post/:idTarget', (req, res) => {
            PostHandler.getPostForOneEntity(req, res);
        });
	}

	private static mountPrivateRoutes(router: Router) {
        router.get('/post', checkJwt, (req, res) => {
            PostHandler.get(req, res);
        });
        router.post('/post', checkJwt, (req, res) => {
            PostHandler.create(req, res);
        });
        router.post('/post/react', checkJwt, (req, res) => {
            PostHandler.react(req, res);
        });
        router.delete('/post/:idPost', (req, res) => {
            PostHandler.delete(req, res);
        });
	}
}