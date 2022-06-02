import { EntityManager } from 'typeorm';
import Tag from '../../tag/entity';

import RecipeTag from '../entity';

export class AbsRecipeTagRepository {
	private static instance: AbsRecipeTagRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsRecipeTagRepository;
	private constructor(dependency);

	findAll(): Promise<RecipeTag[]>;
	findByTag(tag: Tag): Promise<RecipeTag[]>;
	delete(recipeTag: RecipeTag): Promise<void>;
}
