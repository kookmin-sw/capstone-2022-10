import { EntityManager } from 'typeorm';
import RecipeDescription from './entity';

import { AbsRecipeDescriptionRepository } from './type/repository';

export default class RecipeDescriptionRepository implements AbsRecipeDescriptionRepository {
	private static instance: AbsRecipeDescriptionRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsRecipeDescriptionRepository {
		if (!RecipeDescriptionRepository.instance) {
			RecipeDescriptionRepository.instance = new RecipeDescriptionRepository(dependency);
		}
		return RecipeDescriptionRepository.instance;
	}
	private constructor(dependency) {
		RecipeDescriptionRepository.em = dependency.em;
	}

	async delete(recipeDescription: RecipeDescription): Promise<void> {
		await RecipeDescriptionRepository.em.delete(RecipeDescription, recipeDescription);
	}
}
