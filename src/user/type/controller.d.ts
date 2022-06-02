import express, { Router, Request, Response, NextFunction } from 'express';

import { AbsUserService } from './service';

export interface IRequest extends Request {
	userId: number | Error;
}

export abstract class AbsUserController {
	private static instance: AbsUserController;
	private static readonly router: Router;
	private static readonly PATH: string;

	private static userService: AbsUserService;

	public static getInstance(dependency): AbsUserController;
	private constructor(dependency);
	initRouter(app: express.Application): void;

	getBaseDto(req: IRequest, res: Response): Promise<void>;
	checkDuplicateEmail(req: IRequest, res: Response, next: NextFunction);

	signup(req: Request, res: Response): Promise<void>;
	signOut(req: IRequest, res: Response): Promise<void>;

	static logIn(req: Request, res: Response): Promise<void>;
	logOut(req: Request, res: Response): Promise<void>;

	getById(req: Request, res: Response): Promise<void>;
	getByNickname(req: Request, res: Response): Promise<void>;
	getTodayChef(req: Request, res: Response): Promise<void>;

	updateUserInfomation(req: IRequest, res: Response): Promise<void>;
	updateThumbnail(req: IRequest, res: Response): Promise<void>;
}
