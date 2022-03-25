import { EntityManager } from 'typeorm';

import RecipeIngredient from '../entity';

export class AbsRecipeIngredientRepository {
	private static instance: AbsRecipeIngredientRepository;
	private static em: EntityManager;

	static getInstance(dependency): AbsRecipeIngredientRepository;

	private constructor(dependency);

	findAll(): Promise<RecipeIngredient[]>;

	delete(recipeIngredient: RecipeIngredient): Promise<void>;
}
