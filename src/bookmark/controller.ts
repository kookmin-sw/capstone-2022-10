import express, { Request, Response } from 'express';
import { ServerError } from '../helper/helper';
import { mustAuth } from '../helper/middleware';
import RecipeError from '../recipe/type/error';
import UserError from '../user/type/error';

import { AbsBookmarkController } from './type/controller';
import { AbsBookmarkService } from './type/service';

export default class BookmarkController {
	private static instance: AbsBookmarkController;
	private static bookmarkService: AbsBookmarkService;
	private static readonly router = express.Router();
	private static readonly PATH = '/api/bookmarks';

	public static getInstance(dependency): AbsBookmarkController {
		if (!BookmarkController.instance) {
			BookmarkController.instance = new BookmarkController(dependency);
		}
		return BookmarkController.instance;
	}

	private constructor(dependency) {
		BookmarkController.bookmarkService = dependency.bookmarkService;

		this.initRouter(dependency.app);
	}

	initRouter(app: express.Application): void {
		if (BookmarkController.instance) return;

		BookmarkController.router.post('/', mustAuth, this.changeBookmark);
		BookmarkController.router.post('/check', mustAuth, this.checkBookmark);

		app.use(BookmarkController.PATH, BookmarkController.router);
	}

	async checkBookmark(req: Request, res: Response): Promise<void> {
		try {
			const { recipeId, userId } = req.body;
			const hasBookmarked = await BookmarkController.bookmarkService.checkBookmark(recipeId, userId);
			res.status(200).send(hasBookmarked);
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_FOUND.message:
					res.status(UserError.NOT_FOUND.code).send(UserError.NOT_FOUND.message);
					return;
				case RecipeError.NOT_FOUND.message:
					res.status(RecipeError.NOT_FOUND.code).send(RecipeError.NOT_FOUND.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}
	async changeBookmark(req: Request, res: Response): Promise<void> {
		try {
			const { recipeId, userId } = req.body;
			await BookmarkController.bookmarkService.changeBookmark(recipeId, userId);
			res.status(200).send();
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_FOUND.message:
					res.status(UserError.NOT_FOUND.code).send(UserError.NOT_FOUND.message);
					return;
				case RecipeError.NOT_FOUND.message:
					res.status(RecipeError.NOT_FOUND.code).send(RecipeError.NOT_FOUND.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}
}
