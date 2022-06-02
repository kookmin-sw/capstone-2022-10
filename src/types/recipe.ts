import { RecipeDescription } from './recipeDescription';
import { RecipeIngredient } from './recipeIngredient';
import { TagType } from './tag';
import { BaseUserDTO } from './user';

class BaseRecipeDTO {
  id: number;
  title: string;
  thumbnailUrl: string;

  constructor(id: number, title: string, thumbnailUrl: string) {
    this.id = id;
    this.title = title;
    this.thumbnailUrl = thumbnailUrl;
  }
}

interface ReadRecipeDTO extends BaseRecipeDTO {
  readonly tags: TagType[];
  readonly user: BaseUserDTO;
}

interface ReadRecipeDetailDTO extends ReadRecipeDTO {
  readonly referenceUrl: string;
  readonly description: string;
  readonly serving: number;
  readonly recipeIngredients: RecipeIngredient[];
  readonly recipeDescriptions: RecipeDescription[];
  readonly bookmark: boolean;
}

class CreateRecipeDTO {
  recipeIngredients: RecipeIngredient[];
  recipeDescriptions: RecipeDescription[];
  tags: TagType[];
  thumbnailUrl: string;
  title: string;
  description: string;
  referenceUrl: string;
  serving: number;

  constructor(
    recipeIngredients: RecipeIngredient[],
    recipeDescriptions: RecipeDescription[],
    tags: TagType[],
    thumbnailUrl: string,
    title: string,
    description: string,
    referenceUrl: string,
    serving: number,
  ) {
    this.recipeIngredients = recipeIngredients;
    this.recipeDescriptions = recipeDescriptions;
    this.tags = tags;
    this.thumbnailUrl = thumbnailUrl;
    this.title = title;
    this.description = description;
    this.referenceUrl = referenceUrl;
    this.serving = serving;
  }
}

export { BaseRecipeDTO, CreateRecipeDTO };
export type { ReadRecipeDTO, ReadRecipeDetailDTO };
