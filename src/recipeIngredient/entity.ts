import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn, Generated } from 'typeorm';

import Recipe from '../recipe/entity';
import Ingredient from '../ingredient/entity';

@Entity({ name: 'RECIPE_INGREDIENT' })
export default class RecipeIngredient {
	@PrimaryColumn({ name: 'RECIPE_INGREDIENT_ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@ManyToOne(() => Recipe, (recipe) => recipe.recipeIngredients, { cascade: ['insert', 'update'], onDelete: 'CASCADE' })
	@JoinColumn({ name: 'RECIPE_ID' })
	recipe: Recipe;

	@ManyToOne(() => Ingredient, (ingredient) => ingredient.id, { eager: true, cascade: ['insert', 'update'] })
	@JoinColumn({ name: 'INGREDIENT_ID' })
	ingredient: Ingredient;

	@Column({ name: 'AMOUNT', type: 'varchar', length: 15, nullable: false })
	amount: string;

	static create(recipe: Recipe, ingredient: Ingredient, amount: string) {
		const recipeIngredient = new RecipeIngredient();
		recipeIngredient.recipe = recipe;
		recipeIngredient.ingredient = ingredient;
		recipeIngredient.amount = amount;
		return recipeIngredient;
	}
}
