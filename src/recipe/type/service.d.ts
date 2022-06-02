import Recipe from '../entity';

import { AbsBookmarkRepository } from '../../bookmark/type/repository';
import { AbsUserRepository } from '../../user/type/repository';
import { AbsTagRepository } from '../../tag/type/repository';
import { AbsRecipeRepository } from './repository';

import { BaseRecipeDTO, ModifyRecipeDTO, ReadRecipeDetailDTO, ReadRecipeDTO } from './dto';

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
	createRecipe(userId: number, body: ModifyRecipeDTO): Promise<number | Error>;
	findSubscribingChefsLatest(id: number): Promise<BaseRecipeDTO[] | Error>;
	findByIngredient(ingredients: string[], userId: number): Promise<ReadRecipeDTO[] | Error>;
	findByTitle(title: string): Promise<ReadRecipeDTO[] | Error>;
	findTodaysMostLiked(): Promise<BaseRecipeDTO[] | Error>;
	findLatestCreated(): Promise<BaseRecipeDTO[] | Error>;
	findById(recipeId: number): Promise<ReadRecipeDetailDTO | Error>;
	findRecommendation(userId: number): Promise<BaseRecipeDTO[] | Error>;
	updateRecipe(userId: number, recipeId: number, body: ModifyRecipeDTO): Promise<number | Error>;
}
