import { EntityManager } from 'typeorm';

import RecipeTag from './entity';

import { AbsRecipeTagRepository } from './type/repository';

export default class RecipeTagRepository implements AbsRecipeTagRepository {
	private static instance: AbsRecipeTagRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsRecipeTagRepository {
		if (!RecipeTagRepository.instance) {
			RecipeTagRepository.instance = new RecipeTagRepository(dependency);
		}
		return RecipeTagRepository.instance;
	}

	private constructor(dependency) {
		RecipeTagRepository.em = dependency.em;
	}

	async findAll(): Promise<RecipeTag[]> {
		return await RecipeTagRepository.em.getRepository(RecipeTag).find();
	}

	async delete(recipeTag: RecipeTag): Promise<void> {
		await RecipeTagRepository.em.delete(RecipeTag, recipeTag);
	}
}
