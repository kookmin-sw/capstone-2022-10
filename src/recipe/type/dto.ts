import Recipe from '../entity';
import Tag from '../../tag/entity';
import RecipeIngredient from '../../recipeIngredient/entity';
import RecipeDescription from '../../recipeDescription/entity';
import User from '../../user/entity';

import { BaseUserDTO } from '../../user/type/dto';
import { ModifyRecipeDescriptionDTO } from '../../recipeDescription/type/type';
import { ModifyRecipeIngredientDTO } from '../../recipeIngredient/type/type';

export class BaseRecipeDTO {
	readonly id: number;
	readonly title: string;
	readonly thumbnailUrl: string;

	constructor(id: number, title: string, thumbnailUrl: string) {
		this.id = id;
		this.title = title;
		this.thumbnailUrl = thumbnailUrl;
	}
}

export class ReadRecipeDTO extends BaseRecipeDTO {
	readonly tags: Tag[];
	readonly user: BaseUserDTO;

	constructor(recipe: Recipe, tags: Tag[], user: User) {
		super(recipe.id, recipe.title, recipe.thumbnailUrl);
		this.tags = tags;
		this.user = new BaseUserDTO(user.id, user.nickname, user.thumbnailUrl);
	}
}

export class ReadRecipeDetailDTO extends ReadRecipeDTO {
	readonly referenceUrl: string;
	readonly description: string;
	readonly serving: number;
	readonly ingredients: RecipeIngredient[];
	readonly recipeDescriptions: RecipeDescription[];
	readonly bookmark: boolean;

	constructor(
		recipe: Recipe,
		tags: Tag[],
		user: User,
		ingredients: RecipeIngredient[],
		recipeDescriptions: RecipeDescription[],
		bookmark: boolean
	) {
		super(recipe, tags, user);
		this.referenceUrl = recipe.referenceUrl;
		this.description = recipe.description;
		this.serving = recipe.serving;
		this.ingredients = ingredients;
		this.recipeDescriptions = recipeDescriptions;
		this.bookmark = bookmark;
	}
}

// create | update
export interface ModifyRecipeDTO {
	readonly title: string;
	readonly tags: Tag[] | string[];
	readonly description: string;
	readonly thumbnailUrl: string;
	readonly referenceUrl: string;
	readonly serving: number;
	readonly ingredients: ModifyRecipeIngredientDTO[];
	readonly recipeDescriptions: ModifyRecipeDescriptionDTO[];
}
