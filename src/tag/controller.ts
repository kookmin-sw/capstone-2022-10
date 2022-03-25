import express, { Request, Response } from 'express';

import { AbsTagController } from './type/controller';
import { AbsTagService } from './type/service';

export default class TagController implements AbsTagController {
	private static instance: AbsTagController;
	private static tagService: AbsTagService;
	private static readonly router = express.Router();
	private static readonly PATH = '/api/tags';

	public static getInstance(dependency): AbsTagController {
		if (!TagController.instance) {
			TagController.instance = new TagController(dependency);
		}
		return TagController.instance;
	}

	private constructor(dependency) {
		TagController.tagService = dependency.tagService;
		this.initRouter(dependency.app);
	}

	initRouter(app: express.Application): void {
		if (TagController.instance) return;

		TagController.router.get('/search', this.getTagByName);

		app.use(TagController.PATH, TagController.router);
	}

	async getTagByName(req: Request, res: Response): Promise<void> {
		try {
			const name = String(req.query.name);
			const findTag = await TagController.tagService.findTagByName(name);

			res.status(200).send(findTag);
		} catch (error) {
			switch (error.message) {
				default:
					res.status(400).send();
					return;
			}
		}
	}
}
