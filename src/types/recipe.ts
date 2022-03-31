interface RawBaseRecipe {
  id: number;
  title: string;
  thumbnailUrl: string;
}

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

export { BaseRecipeDTO };
export type { RawBaseRecipe };
