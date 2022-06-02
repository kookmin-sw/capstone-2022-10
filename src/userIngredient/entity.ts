import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Ingredient from '../ingredient/entity';
import User from '../user/entity';

@Entity({ name: 'USER_INGREDIENT' })
export default class UserIngredient {
	@ManyToOne(() => User, (user) => user.ingredients, { primary: true, onDelete: 'CASCADE' })
	@JoinColumn({ name: 'USER_ID' })
	user: User;

	@ManyToOne(() => Ingredient, (ingredient) => ingredient.user, { primary: true, eager: true })
	@JoinColumn({ name: 'INGREDIENT_ID' })
	ingredient: Ingredient;

	@Column({ name: 'COUNT', type: 'bigint', nullable: false, default: 1 })
	count: number;

	static create(user: User, ingredient: Ingredient) {
		const userIngredient = new UserIngredient();
		userIngredient.user = user;
		userIngredient.ingredient = ingredient;
		return userIngredient;
	}
}
