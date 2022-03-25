import RecipeDescription from '../recipeDescription/entity';
import RecipeIngredient from '../recipeIngredient/entity';
import Ingredient from '../ingredient/entity';
import RecipeTag from '../recipeTag/entity';
import Recipe from './entity';
import Tag from '../tag/entity';
import User from '../user/entity';

import { AbsRecipeDescriptionRepository } from '../recipeDescription/type/repository';
import { AbsRecipeIngredientRepository } from '../recipeIngredient/type/repository';
import { AbsIngredientRepository } from '../ingredient/type/repository';
import { AbsRecipeTagRepository } from '../recipeTag/type/repository';
import { AbsUserRepository } from '../user/type/repository';
import { AbsTagRepository } from '../tag/type/repository';
import { AbsRecipeRepository } from './type/repository';
import { AbsRecipeService } from './type/service';

import { BaseRecipeDTO, ModifyRecipeDTO, ReadRecipeDetailDTO } from './type/dto';
import UserError from '../user/type/error';
import RecipeError from './type/error';

export default class RecipeService implements AbsRecipeService {
	private static instance: AbsRecipeService;

	private static recipeDescriptionRepository: AbsRecipeDescriptionRepository;
	private static recipeIngredientRepository: AbsRecipeIngredientRepository;
	private static ingredientRepository: AbsIngredientRepository;
	private static recipeTagRepository: AbsRecipeTagRepository;
	private static recipeRepository: AbsRecipeRepository;
	private static userRepository: AbsUserRepository;
	private static tagRepository: AbsTagRepository;

	private static INCLUDE_THRESHOLD = 0.5;

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
	}

	private static getIncludeRate(ingredients: RecipeIngredient[], keywords: string[]): boolean {
		let count = 0;
		ingredients.forEach((ingredient) => {
			if (keywords.includes(ingredient.ingredient.name)) {
				count += 1;
			}
		});
		return count / ingredients.length >= RecipeService.INCLUDE_THRESHOLD ? true : false;
	}

	async deleteRecipe(userId: number, recipeId: number): Promise<void | Error> {
		const recipe = await RecipeService.recipeRepository.findById(recipeId);
		if (!recipe) throw new Error(RecipeError.NOT_FOUND.message);

		const recipeUser = await recipe.user;
		if (Number(recipeUser.id) !== userId) throw new Error(UserError.NOT_AUTHORIZED.message);

		await RecipeService.recipeRepository.remove(recipe);
	}

	async createRecipe(userId: number, body: ModifyRecipeDTO): Promise<void | Error> {
		// user 찾기
		const user = await RecipeService.userRepository.findById(userId);
		if (!user) throw new Error(UserError.NOT_FOUND.message);

		// 미완성 recipe Object 만들기
		const recipe = Recipe.create(body, user);

		// recipeDescription 만들기
		const recipeDescriptions = body.recipeDescriptions.map((rawRecipeDescription) =>
			RecipeDescription.create(recipe, rawRecipeDescription)
		);

		// ingredient 찾기 & 없으면 만들기
		const ingredients = await Promise.all(
			body.ingredients.map(async (rawIngredient) => {
				const ingredient = (await RecipeService.ingredientRepository.findByName(rawIngredient.name))[0];
				return ingredient ? ingredient : Ingredient.create(rawIngredient);
			})
		);

		// RecipeIngredient 만들기
		const recipeIngredients = ingredients.map((ingredient, index) =>
			RecipeIngredient.create(recipe, ingredient, body.ingredients[index].amount)
		);

		// tag 찾기 & 없으면 만들기
		const tags = await Promise.all(
			body.tags.map(async (tagName) => {
				const tag = await RecipeService.tagRepository.findTagByName(tagName);
				return tag ? tag : Tag.create(tagName);
			})
		);

		// RecipeTag 만들기
		const recipeTags = tags.map((tag) => RecipeTag.create(recipe, tag));

		// 연관관계 설정
		recipe.recipeDescriptions = recipeDescriptions;
		recipe.recipeIngredients = recipeIngredients;
		recipe.recipeTags = recipeTags;

		// Recipe 저장
		await RecipeService.recipeRepository.save(recipe);
	}

	async updateRecipe(userId: number, recipeId: number, body: ModifyRecipeDTO): Promise<void | Error> {
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
			body.ingredients.map(async (rawIngredient) => {
				const ingredient = (await RecipeService.ingredientRepository.findByName(rawIngredient.name))[0];
				return ingredient ? ingredient : Ingredient.create(rawIngredient);
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
			RecipeIngredient.create(recipe, ingredient, body.ingredients[index].amount)
		);

		// tag 찾기 & 없으면 만들기
		const tags = await Promise.all(
			body.tags.map(async (tagName) => {
				const tag = await RecipeService.tagRepository.findTagByName(tagName);
				return tag ? tag : Tag.create(tagName);
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

		await RecipeService.recipeRepository.save(recipe);
	}

	async findById(recipeId: number, userId: number): Promise<ReadRecipeDetailDTO | Error> {
		const recipe = await RecipeService.recipeRepository.findById(recipeId);
		if (!recipe) throw new Error(RecipeError.NOT_FOUND.message);

		const user = await recipe.user;
		const tags = (await recipe.recipeTags).map((recipeTag) => recipeTag.tag);
		const recipeIngredient = await recipe.recipeIngredients;
		const recipeDescription = await recipe.recipeDescriptions;
		const bookmark = userId === undefined ? false : RecipeService.include(await recipe.likeUsers, user) ? true : false;
		return new ReadRecipeDetailDTO(recipe, tags, user, recipeIngredient, recipeDescription, bookmark);
	}

	private static include(likeUsers: User[], user: User): boolean {
		return likeUsers.filter((likeUser) => likeUser.id === user.id).length !== 0 ? true : false;
	}

	async findByTitle(title: string): Promise<Recipe[] | Error> {
		const findRecipes = await RecipeService.recipeRepository.findByTitle(title);
		return findRecipes;
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

	async findSubscribingChefsLatest(id: number): Promise<Recipe[] | Error> {
		const findRecipes = await RecipeService.recipeRepository.findBySubscribingChefsLatest(id);
		return findRecipes;
	}

	async findByIngredient(keywords: string[]): Promise<Recipe[] | Error> {
		const allRecipes = await RecipeService.recipeRepository.findAll();

		return await Promise.all(
			allRecipes.filter(async (recipe) => {
				const ingredients = await recipe.recipeIngredients;
				if (RecipeService.getIncludeRate(ingredients, keywords)) return recipe;
			})
		);
	}
}
