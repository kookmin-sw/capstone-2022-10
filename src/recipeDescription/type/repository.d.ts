import { EntityManager } from 'typeorm';

import RecipeDescription from '../entity';

export class AbsRecipeDescriptionRepository {
	private static instance: AbsRecipeDescriptionRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsRecipeDescriptionRepository;
	private constructor(dependency);

	delete(recipeDescription: RecipeDescription): Promise<void>;
}
