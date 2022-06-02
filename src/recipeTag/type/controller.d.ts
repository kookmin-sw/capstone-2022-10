import express, { Request, Response, Router } from 'express';

import { AbsRecipeTagService } from './service';

export abstract class AbsRecipeTagController {
	private static instance: AbsRecipeTagController;
	private static bookmarkService: AbsRecipeTagService;
	private static readonly router: Router;
	private static readonly PATH: string;

	public static getInstance(dependency): AbsRecipeTagController;
	private constructor(dependency);
	initRouter(app: express.Application): void;

	getRecipeByTag(req: Request, res: Response): Promise<void>;
}
