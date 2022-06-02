import express, { Request, Response } from 'express';
import { ServerError } from '../helper/helper';
import { mustAuth } from '../helper/middleware';
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

		SubscribeController.router.post('/', mustAuth, this.changeSubscribe);
		SubscribeController.router.get('/:id', mustAuth, this.checkSubscription);

		app.use(SubscribeController.PATH, SubscribeController.router);
	}

	async checkSubscription(req: Request, res: Response): Promise<void> {
		try {
			const { userId } = req.body;
			const starId = Number(req.params.id);

			const hasSubscribed = await SubscribeController.subscribeService.checkSubscription(userId, starId);

			res.status(200).send(hasSubscribed);
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

	async changeSubscribe(req: Request, res: Response): Promise<void> {
		try {
			const { userId, starId } = req.body;

			const isSubscription = await SubscribeController.subscribeService.changeSubscribe(userId, starId);

			res.status(200).send(isSubscription);
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
