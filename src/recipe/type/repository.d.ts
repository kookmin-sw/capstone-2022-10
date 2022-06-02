import { RowDataPacket } from 'mysql2';
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
	save(recipe: Recipe): Promise<number>;
	findBySubscribingChefsLatest(id: number): Promise<RowDataPacket[]>;
	findByTitle(title: string): Promise<Recipe[]>;
	findByTodaysMostLiked(): Promise<Recipe[]>;
	findByLatestCreated(): Promise<Recipe[]>;
	findById(id: number): Promise<Recipe>;
	findByIds(ids: number[]): Promise<Recipe[]>;
	findAll(): Promise<Recipe[]>;
	findRandomRecipe(count: number): Promise<RowDataPacket[]>;
}
