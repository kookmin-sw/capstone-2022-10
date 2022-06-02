import express, { Request, Response } from 'express';
import { ServerError } from '../helper/helper';
import { AbsRecipeTagController } from './type/controller';
import { AbsRecipeTagService } from './type/service';

export default class RecipeTagController implements AbsRecipeTagController {
	private static instance: AbsRecipeTagController;
	private static recipeTagService: AbsRecipeTagService;
	private static readonly router = express.Router();
	private static readonly PATH = '/api/recipe-tag';

	public static getInstance(dependency): AbsRecipeTagController {
		if (!RecipeTagController.instance) {
			RecipeTagController.instance = new RecipeTagController(dependency);
		}
		return RecipeTagController.instance;
	}

	private constructor(dependency) {
		RecipeTagController.recipeTagService = dependency.recipeTagService;
		this.initRouter(dependency.app);
	}

	initRouter(app: express.Application): void {
		if (RecipeTagController.instance) return;

		RecipeTagController.router.get('/search', this.getRecipeByTag);

		app.use(RecipeTagController.PATH, RecipeTagController.router);
	}

	async getRecipeByTag(req: Request, res: Response): Promise<void> {
		try {
			const { tag } = req.query;
			const recipes = await RecipeTagController.recipeTagService.getRecipeByTag(<string>tag);
			res.status(200).send(recipes);
		} catch (error) {
			switch (error.message) {
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}
}
