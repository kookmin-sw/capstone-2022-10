import { EntityManager } from 'typeorm';

import Recipe from '../entity';

import { ModifyRecipeDTO } from './dto';

export abstract class AbsRecipeRepository {
	private static instance: AbsRecipeRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsRecipeRepository;
	private constructor(dependency);

	remove(recipe: Recipe): Promise<void>;
	create(rawRecipe: ModifyRecipeDTO): Recipe;
	save(recipe: Recipe): Promise<void>;
	findBySubscribingChefsLatest(id: number): Promise<Recipe[]>;
	findByTitle(title: string): Promise<Recipe[]>;
	findByTodaysMostLiked(): Promise<Recipe[]>;
	findByLatestCreated(): Promise<Recipe[]>;
	findById(id: number): Promise<Recipe>;
	findAll(): Promise<Recipe[]>;
}
