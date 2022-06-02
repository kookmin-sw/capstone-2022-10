import { RowDataPacket } from 'mysql2';
import { EntityManager } from 'typeorm';
import Ingredient from '../../ingredient/entity';

import RecipeIngredient from '../entity';

export class AbsRecipeIngredientRepository {
	private static instance: AbsRecipeIngredientRepository;
	private static em: EntityManager;

	static getInstance(dependency): AbsRecipeIngredientRepository;

	private constructor(dependency);

	findAll(): Promise<RecipeIngredient[]>;
	findByIngredients(ingredients: Ingredient[]): Promise<RowDataPacket[]>;
	delete(recipeIngredient: RecipeIngredient): Promise<void>;
}
