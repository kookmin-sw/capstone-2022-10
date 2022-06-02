import { EntityManager } from 'typeorm';
import Ingredient from '../../ingredient/entity';
import UserIngredient from '../entity';

export abstract class AbsUserIngredientRepository {
	private static instance: AbsUserIngredientRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsUserIngredientRepository;
	private constructor(dependency);

	findByUserId(userId: number): Promise<UserIngredient[]>;
	findByUserIdAndIngredient(userId: number, ingredient: Ingredient): Promise<UserIngredient>;
}
