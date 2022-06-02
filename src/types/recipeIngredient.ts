import { Ingredient } from './ingredient';

class RecipeIngredient {
  id: number;
  amount: string;
  ingredient: Ingredient;

  constructor(id: number, amount: string, ingredient: Ingredient) {
    this.id = id;
    this.amount = amount;
    this.ingredient = ingredient;
  }
}

export { RecipeIngredient };
