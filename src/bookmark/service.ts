import Recipe from '../recipe/entity';

import { AbsBookmarkService } from './type/service';
import { AbsUserRepository } from '../user/type/repository';
import { AbsRecipeRepository } from '../recipe/type/repository';
import { AbsBookmarkRepository } from './type/repository';
import UserError from '../user/type/error';
import RecipeError from '../recipe/type/error';

export default class BookmarkService implements AbsBookmarkService {
	private static instance: AbsBookmarkService;
	private static bookmarkRepository: AbsBookmarkRepository;
	private static recipeRepository: AbsRecipeRepository;
	private static userRepository: AbsUserRepository;

	public static getInstance(dependency): AbsBookmarkService {
		if (!BookmarkService.instance) {
			BookmarkService.instance = new BookmarkService(dependency);
		}
		return BookmarkService.instance;
	}

	private constructor(dependency) {
		BookmarkService.bookmarkRepository = dependency.bookmarkRepository;
		BookmarkService.userRepository = dependency.userRepository;
		BookmarkService.recipeRepository = dependency.recipeRepository;
	}
	async checkBookmark(recipeId: number, userId: number): Promise<boolean | Error> {
		const recipe = await BookmarkService.recipeRepository.findById(recipeId);
		const user = await BookmarkService.userRepository.findById(userId);
		if (!recipe) throw new Error(RecipeError.NOT_FOUND.message);
		if (!user) throw new Error(UserError.NOT_FOUND.message);

		const likeUsers = await recipe.likeUsers;

		return likeUsers.filter((user) => Number(user.id) === userId).length !== 0;
	}

	async changeBookmark(recipeId: number, userId: number): Promise<void> {
		const user = await BookmarkService.userRepository.findById(userId);
		if (!user) throw new Error(UserError.NOT_FOUND.message);
		const bookmarks = await user.bookmarks;

		const recipe = await BookmarkService.recipeRepository.findById(recipeId);
		if (!recipe) throw new Error(RecipeError.NOT_FOUND.message);
		const recipeUser = await recipe.user;

		const [doesInclude, index] = BookmarkService.include(bookmarks, recipe);

		if (doesInclude) {
			bookmarks.splice(index, 1);
			recipeUser.numberOfLike--;
			recipe.numberOfLike--;
		} else {
			bookmarks.push(recipe);
			recipeUser.numberOfLike++;
			recipe.numberOfLike++;
		}

		await BookmarkService.bookmarkRepository.changeBookmark(recipeUser, user, recipe);
	}

	private static include(bookmark: Recipe[], recipe: Recipe): [boolean, number] {
		let returnIndex = 0;
		return bookmark.filter((bookmarkedRecipe, index) => {
			if (bookmarkedRecipe.id === recipe.id) {
				returnIndex = index;
				return bookmarkedRecipe;
			}
		}).length !== 0
			? [true, returnIndex]
			: [false, returnIndex];
	}
}
