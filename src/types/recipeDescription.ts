class RecipeDescription {
  id: number;
  imageDescription: string;
  imageUrl: string;
  descriptionOrder: number;

  constructor(id: number, imageDescription: string, imageUrl: string, descriptionOrder: number) {
    this.id = id;
    this.imageDescription = imageDescription;
    this.imageUrl = imageUrl;
    this.descriptionOrder = descriptionOrder;
  }
}

export { RecipeDescription };
