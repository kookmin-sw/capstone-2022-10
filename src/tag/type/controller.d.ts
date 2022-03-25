import express, { Router, Request, Response } from 'express';

import { AbsTagService } from './service';

export abstract class AbsTagController {
	private static instance: AbsTagController;
	private static tagService: AbsTagService;
	private static readonly router: Router;
	private static readonly PATH: string;

	public static getInstance(dependency): AbsTagController;
	private constructor(dependency);
	initRouter(app: express.Application): void;

	getTagByName(req: Request, res: Response): Promise<void>;
}
