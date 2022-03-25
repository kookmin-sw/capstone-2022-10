import { EntityManager } from 'typeorm';
import Recipe from '../../recipe/entity';
import User from '../../user/entity';

export abstract class AbsBookmarkRepository {
	private static instance: AbsBookmarkRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsBookmarkRepository;
	private constructor(dependency);

	changeBookmark(userOfLikedRecipe: User, user: User, recipe: Recipe): Promise<void>;
}
