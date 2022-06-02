import { Connection } from 'typeorm';

import UserController from './user/controller';
import UserService from './user/service';
import UserRepository from './user/repository';

import TagController from './tag/controller';
import TagService from './tag/service';
import TagRepository from './tag/repository';

import RecipeController from './recipe/controller';
import RecipeService from './recipe/service';
import RecipeRepository from './recipe/repository';

import subscribeRepository from './subscribe/repository';
import SubscribeService from './subscribe/service';
import SubscribeController from './subscribe/controller';

import BookmarkController from './bookmark/controller';
import BookmarkService from './bookmark/service';
import BookmarkRepository from './bookmark/repository';

import RecipeDescriptionRepository from './recipeDescription/repository';
import RecipeIngredientRepository from './recipeIngredient/repository';
import IngredientRepository from './ingredient/repository';
import RecipeTagRepository from './recipeTag/repository';
import UserIngredientRepository from './userIngredient/repository';
import RecipeTagController from './recipeTag/controller';
import RecipeTagService from './recipeTag/service';

export default class Container {
	private static isInitialzied = false;
	private static readonly bean = {
		Controller: {},
		Service: {},
		Repository: {},
	};

	static getBean(layer: layer, domain: domain) {
		return Container.bean[layer][domain];
	}

	static initContainer(app: Express.Application, connection: Connection): void {
		if (Container.isInitialzied) return;
		Container.initRepository(connection);
		Container.initService();
		Container.initController(app);
		Container.isInitialzied = true;
	}

	private static initController(app) {
		const commonDependency = { app };
		Container.bean[layer.CONTROLLER][domain.USER] = UserController.getInstance({
			...commonDependency,
			userService: Container.getBean(layer.SERVICE, domain.USER),
		});
		Container.bean[layer.CONTROLLER][domain.TAG] = TagController.getInstance({
			...commonDependency,
			tagService: Container.getBean(layer.SERVICE, domain.TAG),
		});
		Container.bean[layer.CONTROLLER][domain.RECIPE] = RecipeController.getInstance({
			...commonDependency,
			recipeService: Container.getBean(layer.SERVICE, domain.RECIPE),
		});
		Container.bean[layer.CONTROLLER][domain.SUBSCRIBE] = SubscribeController.getInstance({
			...commonDependency,
			subscribeService: Container.getBean(layer.SERVICE, domain.SUBSCRIBE),
		});
		Container.bean[layer.CONTROLLER][domain.BOOKMARK] = BookmarkController.getInstance({
			...commonDependency,
			bookmarkService: Container.getBean(layer.SERVICE, domain.BOOKMARK),
		});
		Container.bean[layer.CONTROLLER][domain.RECIPE_TAG] = RecipeTagController.getInstance({
			...commonDependency,
			recipeTagService: Container.getBean(layer.SERVICE, domain.RECIPE_TAG),
		});
	}

	private static initService() {
		Container.bean[layer.SERVICE][domain.USER] = UserService.getInstance({
			userRepository: Container.getBean(layer.REPOSITORY, domain.USER),
		});
		Container.bean[layer.SERVICE][domain.TAG] = TagService.getInstance({
			tagRepository: Container.getBean(layer.REPOSITORY, domain.TAG),
		});
		Container.bean[layer.SERVICE][domain.RECIPE] = RecipeService.getInstance({
			recipeRepository: Container.getBean(layer.REPOSITORY, domain.RECIPE),
			userRepository: Container.getBean(layer.REPOSITORY, domain.USER),
			tagRepository: Container.getBean(layer.REPOSITORY, domain.TAG),
			ingredientRepository: Container.getBean(layer.REPOSITORY, domain.INGREDIENT),
			recipeTagRepository: Container.getBean(layer.REPOSITORY, domain.RECIPE_TAG),
			recipeIngredientRepository: Container.getBean(layer.REPOSITORY, domain.RECIPE_INGREDIENT),
			recipeDescriptionRepository: Container.getBean(layer.REPOSITORY, domain.RECIPE_DESCRIPTION),
			bookmarkRepository: Container.getBean(layer.REPOSITORY, domain.BOOKMARK),
			userIngredientRepository: Container.getBean(layer.REPOSITORY, domain.USER_INGREDIENT),
		});
		Container.bean[layer.SERVICE][domain.SUBSCRIBE] = SubscribeService.getInstance({
			subscribeRepository: Container.getBean(layer.REPOSITORY, domain.SUBSCRIBE),
			userRepository: Container.getBean(layer.REPOSITORY, domain.USER),
		});
		Container.bean[layer.SERVICE][domain.BOOKMARK] = BookmarkService.getInstance({
			bookmarkRepository: Container.getBean(layer.REPOSITORY, domain.BOOKMARK),
			recipeRepository: Container.getBean(layer.REPOSITORY, domain.RECIPE),
			userRepository: Container.getBean(layer.REPOSITORY, domain.USER),
		});
		Container.bean[layer.SERVICE][domain.RECIPE_TAG] = RecipeTagService.getInstance({
			recipeTagRepository: Container.getBean(layer.REPOSITORY, domain.RECIPE_TAG),
			tagRepository: Container.getBean(layer.REPOSITORY, domain.TAG),
		});
	}

	private static initRepository(connection: Connection) {
		const commonDependency = { em: connection.manager };
		Container.bean[layer.REPOSITORY][domain.USER] = UserRepository.getInstance({ ...commonDependency });
		Container.bean[layer.REPOSITORY][domain.TAG] = TagRepository.getInstance({ ...commonDependency });
		Container.bean[layer.REPOSITORY][domain.RECIPE] = RecipeRepository.getInstance({ ...commonDependency });
		Container.bean[layer.REPOSITORY][domain.RECIPE_TAG] = RecipeTagRepository.getInstance({ ...commonDependency });
		Container.bean[layer.REPOSITORY][domain.RECIPE_INGREDIENT] = RecipeIngredientRepository.getInstance({ ...commonDependency });
		Container.bean[layer.REPOSITORY][domain.RECIPE_DESCRIPTION] = RecipeDescriptionRepository.getInstance({ ...commonDependency });
		Container.bean[layer.REPOSITORY][domain.INGREDIENT] = IngredientRepository.getInstance({ ...commonDependency });
		Container.bean[layer.REPOSITORY][domain.BOOKMARK] = BookmarkRepository.getInstance({ ...commonDependency });
		Container.bean[layer.REPOSITORY][domain.SUBSCRIBE] = subscribeRepository.getInstance({ ...commonDependency });
		Container.bean[layer.REPOSITORY][domain.USER_INGREDIENT] = UserIngredientRepository.getInstance({ ...commonDependency });
	}
}

export enum layer {
	ENTITY = 'Entity',
	CONTROLLER = 'Controller',
	SERVICE = 'Service',
	REPOSITORY = 'Repository',
}

export enum domain {
	USER = 'User',
	TAG = 'Tag',
	RECIPE = 'Recipe',
	RECIPE_TAG = 'RecipeTag',
	RECIPE_INGREDIENT = 'RecipeIngredient',
	RECIPE_DESCRIPTION = 'RecipeDescription',
	INGREDIENT = 'Ingredient',
	DATEINFO = 'DateInfo',
	BOOKMARK = 'Bookmark',
	SUBSCRIBE = 'Subscribe',
	USER_INGREDIENT = 'UserIngredient',
}
