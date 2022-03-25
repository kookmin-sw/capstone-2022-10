import { EntityManager } from 'typeorm';

import recipeIngredientEntity from './entity';
import RecipeIngredient from './entity';

import { AbsRecipeIngredientRepository } from './type/repository';

export default class RecipeIngredientRepository implements AbsRecipeIngredientRepository {
	private static instance: AbsRecipeIngredientRepository;
	private static em: EntityManager;

	static getInstance(dependency): AbsRecipeIngredientRepository {
		if (!RecipeIngredientRepository.instance) {
			RecipeIngredientRepository.instance = new RecipeIngredientRepository(dependency);
		}
		return RecipeIngredientRepository.instance;
	}

	private constructor(dependency) {
		RecipeIngredientRepository.em = dependency.em;
	}

	async findAll(): Promise<recipeIngredientEntity[]> {
		return await RecipeIngredientRepository.em.getRepository(RecipeIngredient).find();
	}

	async delete(recipeIngredient: RecipeIngredient): Promise<void> {
		await RecipeIngredientRepository.em.delete(RecipeIngredient, recipeIngredient);
	}
}
