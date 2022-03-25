import { EntityManager } from 'typeorm';

import Ingredient from './entity';

import { AbsIngredientRepository } from './type/repository';

export default class IngredientRepository implements AbsIngredientRepository {
	private static instance: AbsIngredientRepository;
	private static em: EntityManager;

	public static getInstance(dependency) {
		if (!IngredientRepository.instance) {
			IngredientRepository.instance = new IngredientRepository(dependency);
		}
		return IngredientRepository.instance;
	}

	private constructor(dependency) {
		IngredientRepository.em = dependency.em;
	}

	async findByName(ingredientName: string): Promise<Ingredient[]> {
		return await IngredientRepository.em.getRepository(Ingredient).find({ where: { name: ingredientName } });
	}
}
