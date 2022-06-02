import { ReadRecipeDTO } from '../recipe/type/dto';
import { AbsTagRepository } from '../tag/type/repository';
import { AbsRecipeTagRepository } from './type/repository';
import { AbsRecipeTagService } from './type/service';

export default class RecipeTagService implements AbsRecipeTagService {
	private static instance: RecipeTagService;
	private static recipeTagRepository: AbsRecipeTagRepository;
	private static tagRepository: AbsTagRepository;

	public static getInstance(dependency): RecipeTagService {
		if (!RecipeTagService.instance) {
			RecipeTagService.instance = new RecipeTagService(dependency);
		}
		return RecipeTagService.instance;
	}

	private constructor(dependency) {
		RecipeTagService.recipeTagRepository = dependency.recipeTagRepository;
		RecipeTagService.tagRepository = dependency.tagRepository;
	}
	async getRecipeByTag(tagName: string): Promise<ReadRecipeDTO[]> {
		const tag = await RecipeTagService.tagRepository.findTagByName(tagName);
		if (tag === undefined) return [];
		const recipeTags = await RecipeTagService.recipeTagRepository.findByTag(tag);
		const recipes = await Promise.all(recipeTags.map(async (recipeTag) => await recipeTag.recipe));
		return await Promise.all(
			recipes.map(async (recipe) => {
				const recipeTags = await recipe.recipeTags;
				const tags = recipeTags.map((recipeTag) => recipeTag.tag);
				const user = await recipe.user;
				return new ReadRecipeDTO(recipe, tags, user);
			})
		);
	}
}
