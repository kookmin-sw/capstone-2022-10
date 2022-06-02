import { EntityManager } from 'typeorm';

import Ingredient from '../entity';

export class AbsIngredientRepository {
	private static instance: AbsIngredientRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsIngredientRepository;
	private constructor(dependency);

	findByName(ingredientName: string): Promise<Ingredient[]>;
	findByNameList(ingredients: string[]): Promise<Ingredient[]>;
}
