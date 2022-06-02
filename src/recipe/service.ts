import RecipeDescription from '../recipeDescription/entity';
import RecipeIngredient from '../recipeIngredient/entity';
import Ingredient from '../ingredient/entity';
import RecipeTag from '../recipeTag/entity';
import Recipe from './entity';
import Tag from '../tag/entity';

import { AbsRecipeDescriptionRepository } from '../recipeDescription/type/repository';
import { AbsRecipeIngredientRepository } from '../recipeIngredient/type/repository';
import { AbsUserIngredientRepository } from '../userIngredient/type/repository';
import { AbsIngredientRepository } from '../ingredient/type/repository';
import { AbsRecipeTagRepository } from '../recipeTag/type/repository';
import { AbsUserRepository } from '../user/type/repository';
import { AbsTagRepository } from '../tag/type/repository';
import { AbsRecipeRepository } from './type/repository';
import { AbsRecipeService } from './type/service';

import { BaseRecipeDTO, ModifyRecipeDTO, ReadRecipeDetailDTO, ReadRecipeDTO } from './type/dto';
import UserError from '../user/type/error';
import RecipeError from './type/error';
import UserIngredient from '../userIngredient/entity';

export default class RecipeService implements AbsRecipeService {
	private static instance: AbsRecipeService;

	private static recipeDescriptionRepository: AbsRecipeDescriptionRepository;
	private static recipeIngredientRepository: AbsRecipeIngredientRepository;
	private static userIngredientRepository: AbsUserIngredientRepository;
	private static ingredientRepository: AbsIngredientRepository;
	private static recipeTagRepository: AbsRecipeTagRepository;
	private static recipeRepository: AbsRecipeRepository;
	private static userRepository: AbsUserRepository;
	private static tagRepository: AbsTagRepository;

	public static getInstance(dependency): AbsRecipeService {
		if (!RecipeService.instance) {
			RecipeService.instance = new RecipeService(dependency);
		}
		return RecipeService.instance;
	}

	private constructor(dependency) {
		RecipeService.ingredientRepository = dependency.ingredientRepository;
		RecipeService.recipeRepository = dependency.recipeRepository;
		RecipeService.userRepository = dependency.userRepository;
		RecipeService.tagRepository = dependency.tagRepository;
		RecipeService.recipeDescriptionRepository = dependency.recipeDescriptionRepository;
		RecipeService.recipeIngredientRepository = dependency.recipeIngredientRepository;
		RecipeService.recipeTagRepository = dependency.recipeTagRepository;
		RecipeService.userIngredientRepository = dependency.userIngredientRepository;
	}

	async deleteRecipe(userId: number, recipeId: number): Promise<void | Error> {
		const recipe = await RecipeService.recipeRepository.findById(recipeId);
		if (!recipe) throw new Error(RecipeError.NOT_FOUND.message);

		const recipeUser = await recipe.user;
		if (Number(recipeUser.id) !== userId) throw new Error(UserError.NOT_AUTHORIZED.message);

		await RecipeService.recipeRepository.remove(recipe);
	}

	async createRecipe(userId: number, rawRecipe: ModifyRecipeDTO): Promise<number | Error> {
		// user 찾기
		const user = await RecipeService.userRepository.findById(userId);
		if (!user) throw new Error(UserError.NOT_FOUND.message);

		// 미완성 recipe Object 만들기
		const recipe = Recipe.create(rawRecipe, user);

		// recipeDescription 만들기
		const recipeDescriptions = rawRecipe.recipeDescriptions.map((rawRecipeDescription) =>
			RecipeDescription.create(recipe, rawRecipeDescription)
		);

		// ingredient 찾기 & 없으면 만들기
		const ingredients = await Promise.all(
			rawRecipe.recipeIngredients.map(async (recipeIngredient) => {
				const ingredient = (await RecipeService.ingredientRepository.findByName(recipeIngredient.ingredient.name))[0];
				return ingredient ? ingredient : Ingredient.create(recipeIngredient.ingredient);
			})
		);

		// RecipeIngredient 만들기
		const recipeIngredients = ingredients.map((ingredient, index) =>
			RecipeIngredient.create(recipe, ingredient, rawRecipe.recipeIngredients[index].amount)
		);

		// tag 찾기 & 없으면 만들기
		const tags = await Promise.all(
			rawRecipe.tags.map(async (rawTag: Tag) => {
				const tag = await RecipeService.tagRepository.findTagByName(rawTag.name);
				return tag ? tag : Tag.create(rawTag.name);
			})
		);

		// RecipeTag 만들기
		const recipeTags = tags.map((tag) => RecipeTag.create(recipe, tag));

		// 연관관계 설정
		recipe.recipeDescriptions = recipeDescriptions;
		recipe.recipeIngredients = recipeIngredients;
		recipe.recipeTags = recipeTags;

		// Recipe 저장
		return await RecipeService.recipeRepository.save(recipe);
	}

	async updateRecipe(userId: number, recipeId: number, body: ModifyRecipeDTO): Promise<number | Error> {
		const recipe = await RecipeService.recipeRepository.findById(recipeId);
		if (!recipe) throw new Error(RecipeError.NOT_FOUND.message);

		const user = await recipe.user;
		if (Number(user.id) !== userId) throw new Error(UserError.NOT_AUTHORIZED.message);

		// 이전 recipe Description 삭제
		const oldRecipeDescriptions = await recipe.recipeDescriptions;
		await Promise.all(
			oldRecipeDescriptions.map(async (recipeDescription) => {
				return await RecipeService.recipeDescriptionRepository.delete(recipeDescription);
			})
		);

		// recipeDescription 만들기
		const recipeDescriptions = body.recipeDescriptions.map((rawRecipeDescription) =>
			RecipeDescription.create(recipe, rawRecipeDescription)
		);

		// ingredient 찾기 & 없으면 만들기
		const ingredients = await Promise.all(
			body.recipeIngredients.map(async (recipeIngredient) => {
				const ingredient = (await RecipeService.ingredientRepository.findByName(recipeIngredient.ingredient.name))[0];
				return ingredient ? ingredient : Ingredient.create(recipeIngredient.ingredient);
			})
		);

		// 이전 recipe Ingredient 제거
		const oldRecipeIngredient = await recipe.recipeIngredients;
		await Promise.all(
			oldRecipeIngredient.map(async (recipeIngredient) => {
				return await RecipeService.recipeIngredientRepository.delete(recipeIngredient);
			})
		);

		// Recipe Ingredient 만들기
		const recipeIngredients = ingredients.map((ingredient, index) =>
			RecipeIngredient.create(recipe, ingredient, body.recipeIngredients[index].amount)
		);

		// tag 찾기 & 없으면 만들기
		const tags = await Promise.all(
			body.tags.map(async (rawTag: Tag) => {
				const tag = await RecipeService.tagRepository.findTagByName(rawTag.name);
				return tag ? tag : Tag.create(rawTag.name);
			})
		);

		// 이전 recipe tag 제거
		const oldRecipeTags = await recipe.recipeTags;
		await Promise.all(
			oldRecipeTags.map(async (recipeTag) => {
				return await RecipeService.recipeTagRepository.delete(recipeTag);
			})
		);

		// RecipeTag 만들기
		const recipeTags = tags.map((tag) => RecipeTag.create(recipe, tag));

		// 연관관계 설정
		recipe.title = body.title;
		recipe.description = body.description;
		recipe.thumbnailUrl = body.thumbnailUrl;
		recipe.referenceUrl = body.referenceUrl;
		recipe.serving = body.serving;
		recipe.recipeDescriptions = recipeDescriptions;
		recipe.recipeIngredients = recipeIngredients;
		recipe.recipeTags = recipeTags;

		return await RecipeService.recipeRepository.save(recipe);
	}

	async findById(recipeId: number): Promise<ReadRecipeDetailDTO | Error> {
		const recipe = await RecipeService.recipeRepository.findById(recipeId);
		if (!recipe) throw new Error(RecipeError.NOT_FOUND.message);

		const user = await recipe.user;
		const tags = (await recipe.recipeTags).map((recipeTag) => recipeTag.tag);
		const recipeIngredient = await recipe.recipeIngredients;
		const recipeDescription = await recipe.recipeDescriptions;
		return new ReadRecipeDetailDTO(recipe, tags, user, recipeIngredient, recipeDescription, false);
	}

	async findByTitle(title: string): Promise<ReadRecipeDTO[] | Error> {
		const findRecipes = await RecipeService.recipeRepository.findByTitle(title);
		if (findRecipes.length === 0) return [];
		return await Promise.all(
			findRecipes.map(async (recipe) => {
				const recipeTags = await recipe.recipeTags;
				const tags = await Promise.all(recipeTags.map((recipeTag) => recipeTag.tag));
				const user = await recipe.user;
				return new ReadRecipeDTO(recipe, tags, user);
			})
		);
	}

	async findTodaysMostLiked(): Promise<BaseRecipeDTO[] | Error> {
		return (await RecipeService.recipeRepository.findByTodaysMostLiked()).map(
			(recipe) => new BaseRecipeDTO(recipe.id, recipe.title, recipe.thumbnailUrl)
		);
	}

	async findLatestCreated(): Promise<BaseRecipeDTO[] | Error> {
		return (await RecipeService.recipeRepository.findByLatestCreated()).map(
			(recipe) => new BaseRecipeDTO(recipe.id, recipe.title, recipe.thumbnailUrl)
		);
	}

	async findSubscribingChefsLatest(id: number): Promise<BaseRecipeDTO[] | Error> {
		const findRecipes = await RecipeService.recipeRepository.findBySubscribingChefsLatest(id);
		return findRecipes.map((recipe) => new BaseRecipeDTO(recipe.RECIPE_ID, recipe.TITLE, recipe.THUMBNAIL_URL));
	}

	async findByIngredient(rawIngredients: string[], userId: number): Promise<ReadRecipeDTO[]> {
		const ingredients = await RecipeService.ingredientRepository.findByNameList(rawIngredients);
		if (ingredients.length === 0) {
			return [];
		}

		if (userId !== undefined) {
			const userIngredients = await RecipeService.userIngredientRepository.findByUserId(userId);
			const user = await RecipeService.userRepository.findById(userId);
			for (const ingredient of ingredients) {
				let include = false;
				for (const userIngredient of userIngredients) {
					if (ingredient.id === userIngredient.ingredient.id) {
						userIngredient.count++;
						include = true;
						break;
					}
				}
				if (!include) {
					userIngredients.push(UserIngredient.create(user, ingredient));
				}
			}
			user.ingredients = userIngredients;
			await RecipeService.userRepository.save(user);
		}

		const includeRecipesId = (await RecipeService.recipeIngredientRepository.findByIngredients(ingredients)).map(
			(recipe) => recipe.recipeId
		);

		if (includeRecipesId.length == 0) {
			return [];
		}

		const findRecipes = await RecipeService.recipeRepository.findByIds(includeRecipesId);
		return await Promise.all(
			findRecipes.map(async (recipe) => {
				const recipeTags = await recipe.recipeTags;
				const tags = await Promise.all(recipeTags.map((recipeTag) => recipeTag.tag));
				const user = await recipe.user;
				return new ReadRecipeDTO(recipe, tags, user);
			})
		);
	}

	private static getRandomRecipe(recipes: ReadRecipeDTO[]) {
		const randomNumber = Math.floor(Math.random() * recipes.length);
		return recipes[randomNumber];
	}

	async findRecommendation(userId: number): Promise<BaseRecipeDTO[] | Error> {
		const ingredients = (await RecipeService.userIngredientRepository.findByUserId(userId)).map(
			(userIngredient) => userIngredient.ingredient.name
		);

		const recipes: BaseRecipeDTO[] = [];
		let index = 0;

		while (index < ingredients.length) {
			const randomRecipe = RecipeService.getRandomRecipe(await this.findByIngredient([ingredients[index]], userId));
			const notIncluded = recipes.every((recipe) => Number(recipe.id) !== Number(randomRecipe.id));
			if (notIncluded) {
				recipes.push(new BaseRecipeDTO(randomRecipe.id, randomRecipe.title, randomRecipe.thumbnailUrl));
				index++;
			}
		}

		(await RecipeService.recipeRepository.findRandomRecipe(6)).every((newRecipe) => {
			const notIncluded = recipes.every((includeRecipe) => Number(includeRecipe.id) !== Number(newRecipe.RECIPE_ID));
			if (notIncluded) recipes.push(new BaseRecipeDTO(newRecipe.RECIPE_ID, newRecipe.TITLE, newRecipe.THUMBNAIL_URL));
			if (recipes.length >= 6) return false;
			else return true;
		});

		return recipes;
	}
}
