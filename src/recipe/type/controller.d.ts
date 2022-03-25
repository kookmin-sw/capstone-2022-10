import express, { Router, Request, Response } from 'express';

import { AbsRecipeService } from './service';

export abstract class AbsRecipeController {
	private static instance: AbsRecipeController;
	private static recipeService: AbsRecipeService;
	private static readonly router: Router;
	private static readonly PATH: string;

	public static getInstance(dependency): AbsRecipeController;
	private constructor(dependency);
	initRouter(app: express.Application): void;

	deleteRecipe(req: Request, res: Response): Promise<void>;
	createRecipe(req: Request, res: Response): Promise<void>;
	getById(req: Request, res: Response): Promise<void>;
	getByTitle(req: Request, res: Response): Promise<void>;
	getTodaysMostLiked(req: Request, res: Response): Promise<void>;
	getLatestCreated(req: Request, res: Response): Promise<void>;
	getSubscribingChefsLatest(req: Request, res: Response): Promise<void>;
	getByIngredient(req: Request, res: Response): Promise<void>;
}
