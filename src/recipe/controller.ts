import express, { Request, Response } from 'express';
import { ServerError } from '../helper/helper';
import UserError from '../user/type/error';

import { AbsRecipeController } from './type/controller';
import RecipeError from './type/error';
import { AbsRecipeService } from './type/service';

export default class RecipeController implements AbsRecipeController {
	private static instance: AbsRecipeController;
	private static recipeService: AbsRecipeService;
	private static readonly router = express.Router();
	private static readonly PATH = '/api/recipes';

	public static getInstance(dependency): AbsRecipeController {
		if (!RecipeController.instance) {
			RecipeController.instance = new RecipeController(dependency);
		}
		return RecipeController.instance;
	}

	private constructor(dependency) {
		RecipeController.recipeService = dependency.recipeService;
		this.initRouter(dependency.app);
	}

	initRouter(app: express.Application): void {
		if (RecipeController.instance) return;

		RecipeController.router.get('/subscribe-chef-latest', this.getSubscribingChefsLatest);
		RecipeController.router.get('/today-most-liked', this.getTodaysMostLiked);
		RecipeController.router.get('/latest', this.getLatestCreated);
		RecipeController.router.get('/search', this.getByTitle);
		RecipeController.router.get('/:id', this.getById);
		RecipeController.router.post('/search', this.getByIngredient);
		RecipeController.router.post('/', this.createRecipe);
		RecipeController.router.put('/:id', this.updateRecipe);
		RecipeController.router.delete('/:id', this.deleteRecipe);

		app.use(RecipeController.PATH, RecipeController.router);
	}

	async deleteRecipe(req: Request, res: Response): Promise<void> {
		try {
			const recipeId = Number(req.params.id);
			const { userId } = req.body;

			await RecipeController.recipeService.deleteRecipe(userId, recipeId);

			res.status(200).send();
		} catch (error) {
			switch (error.message) {
				case RecipeError.NOT_FOUND.message:
					res.status(RecipeError.NOT_FOUND.code).send(RecipeError.NOT_FOUND.message);
					return;
				case UserError.NOT_AUTHORIZED.message:
					res.status(UserError.NOT_AUTHORIZED.code).send(UserError.NOT_AUTHORIZED.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}
	async createRecipe(req: Request, res: Response): Promise<void> {
		try {
			const { userId, recipe } = req.body;

			await RecipeController.recipeService.createRecipe(userId, recipe);

			res.status(200).send();
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_FOUND.message:
					res.status(UserError.NOT_FOUND.code).send(UserError.NOT_FOUND.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
			}
		}
	}

	async updateRecipe(req: Request, res: Response): Promise<void> {
		try {
			const { userId, recipe } = req.body;
			const recipeId = Number(req.params.id);

			await RecipeController.recipeService.updateRecipe(userId, recipeId, recipe);

			res.status(200).send();
		} catch (error) {
			switch (error.message) {
				case RecipeError.NOT_FOUND.message:
					res.status(RecipeError.NOT_FOUND.code).send(RecipeError.NOT_FOUND.message);
					return;
				case UserError.NOT_AUTHORIZED.message:
					res.status(UserError.NOT_AUTHORIZED.code).send(UserError.NOT_AUTHORIZED.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
			}
		}
	}

	async getById(req: Request, res: Response): Promise<void> {
		try {
			const recipeId = Number(req.params.id);
			const { userId } = req.body;

			const findRecipes = await RecipeController.recipeService.findById(recipeId, userId);

			res.status(200).send(findRecipes);
		} catch (error) {
			switch (error.message) {
				case RecipeError.NOT_FOUND.message:
					res.status(RecipeError.NOT_FOUND.code).send(RecipeError.NOT_FOUND.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async getByTitle(req: Request, res: Response): Promise<void> {
		try {
			const title = String(req.query.title);

			const findRecipes = await RecipeController.recipeService.findByTitle(title);

			res.status(200).send(findRecipes);
		} catch (error) {
			switch (error.message) {
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async getTodaysMostLiked(req: Request, res: Response): Promise<void> {
		try {
			const findRecipes = await RecipeController.recipeService.findTodaysMostLiked();

			res.status(200).send(findRecipes);
		} catch (error) {
			switch (error.message) {
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async getLatestCreated(req: Request, res: Response): Promise<void> {
		try {
			const findRecipes = await RecipeController.recipeService.findLatestCreated();

			res.status(200).send(findRecipes);
		} catch (error) {
			switch (error.message) {
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async getSubscribingChefsLatest(req: Request, res: Response): Promise<void> {
		try {
			const findRecipes = await RecipeController.recipeService.findSubscribingChefsLatest(3);

			res.status(200).send(findRecipes);
		} catch (error) {
			switch (error.message) {
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async getByIngredient(req: Request, res: Response): Promise<void> {
		try {
			const { ingredients } = req.body;

			const findRecipes = await RecipeController.recipeService.findByIngredient(ingredients);

			res.status(200).send(findRecipes);
		} catch (error) {
			switch (error.message) {
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}
}
