import express, { Router, Request, Response } from 'express';

import { AbsSubscribeService } from './service';

export abstract class AbsSubscribeController {
	private static instance: AbsSubscribeController;
	private static subscribeService: AbsSubscribeService;
	private static readonly router: Router;
	private static readonly PATH: string;

	public static getInstance(dependency): AbsSubscribeController;
	private constructor(dependency);
	initRouter(app: express.Application): void;

	checkSubscription(req: Request, res: Response): Promise<void>;
	changeSubscribe(req: Request, res: Response): Promise<void>;
}
