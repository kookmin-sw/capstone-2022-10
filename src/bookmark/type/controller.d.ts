import express, { Router, Request, Response } from 'express';

import { AbsBookmarkService } from './service';

export abstract class AbsBookmarkController {
	private static instance: AbsBookmarkController;
	private static bookmarkService: AbsBookmarkService;
	private static readonly router: Router;
	private static readonly PATH: string;

	public static getInstance(dependency): AbsBookmarkController;
	private constructor(dependency);
	initRouter(app: express.Application): void;

	changeBookmark(req: Request, res: Response): Promise<void>;
}
