import { EntityManager } from 'typeorm';

import RecipeTag from '../entity';

export class AbsRecipeTagRepository {
	private static instance: AbsRecipeTagRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsRecipeTagRepository;
	private constructor(dependency);

	findAll(): Promise<RecipeTag[]>;

	delete(recipeTag: RecipeTag): Promise<void>;
}
