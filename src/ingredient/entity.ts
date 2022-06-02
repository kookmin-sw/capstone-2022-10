import { Column, Entity, PrimaryColumn, Generated, OneToMany } from 'typeorm';

import UserIngredient from '../userIngredient/entity';

@Entity({ name: 'INGREDIENT' })
export default class Ingredient {
	@PrimaryColumn({ name: 'INGREDIENT_ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@OneToMany(() => UserIngredient, (userIngredient) => userIngredient.ingredient)
	user: UserIngredient[];

	@Column({ name: 'NAME', type: 'varchar', length: 30, nullable: false, unique: true })
	name: string;

	static create(rawIngredient: Ingredient): Ingredient {
		const ingredient = new Ingredient();
		ingredient.name = rawIngredient.name;
		return ingredient;
	}
}
