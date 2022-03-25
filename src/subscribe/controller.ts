import express, { Request, Response } from 'express';
import { ServerError } from '../helper/helper';
import UserError from '../user/type/error';

import { AbsSubscribeController } from './type/controller';
import { AbsSubscribeService } from './type/service';

export default class SubscribeController {
	private static instance: AbsSubscribeController;
	private static subscribeService: AbsSubscribeService;
	private static readonly router = express.Router();
	private static readonly PATH = '/api/subscribe';

	public static getInstance(dependency): AbsSubscribeController {
		if (!SubscribeController.instance) {
			SubscribeController.instance = new SubscribeController(dependency);
		}
		return SubscribeController.instance;
	}

	private constructor(dependency) {
		SubscribeController.subscribeService = dependency.subscribeService;

		this.initRouter(dependency.app);
	}

	initRouter(app: express.Application): void {
		if (SubscribeController.instance) return;

		SubscribeController.router.post('/', this.changeSubscribe);

		app.use(SubscribeController.PATH, SubscribeController.router);
	}

	async changeSubscribe(req: Request, res: Response): Promise<void> {
		try {
			const { userId, starId } = req.body;

			await SubscribeController.subscribeService.changeSubscribe(userId, starId);

			res.status(200).send();
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_FOUND.message:
					res.status(UserError.NOT_FOUND.code).send(UserError.NOT_FOUND.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}
}
