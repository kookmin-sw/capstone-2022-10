import RecipeIngredient from '../../recipeIngredient/entity';
import Recipe from '../entity';

import { AbsBookmarkRepository } from '../../bookmark/type/repository';
import { AbsUserRepository } from '../../user/type/repository';
import { AbsTagRepository } from '../../tag/type/repository';
import { AbsRecipeRepository } from './repository';

import { BaseRecipeDTO, ModifyRecipeDTO, ReadRecipeDetailDTO } from './dto';

export abstract class AbsRecipeService {
	private static recipeRepository: AbsRecipeRepository;
	private static recipeTagRepository: AbsTagRepository;
	private static userRepository: AbsUserRepository;
	private static tagRepository: AbsTagRepository;
	private static bookmarkRepository: AbsBookmarkRepository;
	private static instance: AbsRecipeService;

	public static getInstance(dependency): AbsRecipeService;
	private constructor(dependency);

	deleteRecipe(userId: number, recipeId: number): Promise<void | Error>;
	createRecipe(userId: number, body: ModifyRecipeDTO): Promise<void | Error>;
	findSubscribingChefsLatest(id: number): Promise<Recipe[] | Error>;
	findByIngredient(ingredients: string[]): Promise<Recipe[] | Error>;
	findByTitle(title: string): Promise<Recipe[] | Error>;
	findTodaysMostLiked(): Promise<BaseRecipeDTO[] | Error>;
	findLatestCreated(): Promise<BaseRecipeDTO[] | Error>;
	findById(recipeId: number, userId: number): Promise<ReadRecipeDetailDTO | Error>;

	updateRecipe(userId: number, recipeId: number, body: ModifyRecipeDTO): Promise<void | Error>;

	private static getIncludeRate(ingredients: RecipeIngredient[], keywords: string[]): boolean;
}
