import { AbsUserRepository } from '../../user/type/repository';
import { AbsRecipeRepository } from '../../recipe/type/repository';
import { AbsBookmarkRepository } from './repository';

export abstract class AbsBookmarkService {
	private static instance: AbsBookmarkService;
	private static bookmarkRepository: AbsBookmarkRepository;
	private static recipeRepository: AbsRecipeRepository;
	private static userRepository: AbsUserRepository;

	public static getInstance(dependency): AbsBookmarkService;
	private constructor(dependency);

	changeBookmark(recipeId: number, userId: number): Promise<void>;
}
