import express, { Router, Request, Response } from 'express';

import { AbsUserService } from './service';

export abstract class AbsUserController {
	private static instance: AbsUserController;
	private static readonly router: Router;
	private static readonly PATH: string;

	private static userService: AbsUserService;

	public static getInstance(dependency): AbsUserController;
	private constructor(dependency);
	initRouter(app: express.Application): void;

	signIn(req: Request, res: Response): Promise<void>;
	signOut(req: Request, res: Response): Promise<void>;

	getById(req: Request, res: Response): Promise<void>;
	getByNickname(req: Request, res: Response): Promise<void>;

	updateUserInfomation(req: Request, res: Response): Promise<void>;
	updateThumbnail(req: Request, res: Response): Promise<void>;

	deleteThumbnail(req: Request, res: Response): Promise<void>;
}
