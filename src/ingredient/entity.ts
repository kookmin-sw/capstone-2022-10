import { Column, Entity, PrimaryColumn, Generated } from 'typeorm';

import { ModifyRecipeIngredientDTO } from '../recipeIngredient/type/type';

@Entity({ name: 'INGREDIENT' })
export default class Ingredient {
	@PrimaryColumn({ name: 'INGREDIENT_ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@Column({ name: 'NAME', type: 'varchar', length: 30, nullable: false, unique: true })
	name: string;

	static create(rawIngredient: ModifyRecipeIngredientDTO): Ingredient {
		const ingredient = new Ingredient();
		ingredient.name = rawIngredient.name;
		return ingredient;
	}
}
