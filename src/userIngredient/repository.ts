import { EntityManager } from 'typeorm';
import Ingredient from '../ingredient/entity';
import UserIngredient from './entity';

import { AbsUserIngredientRepository } from './type/repository';

export default class UserIngredientRepository implements AbsUserIngredientRepository {
	private static instance: AbsUserIngredientRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsUserIngredientRepository {
		if (!UserIngredientRepository.instance) {
			UserIngredientRepository.instance = new UserIngredientRepository(dependency);
		}
		return UserIngredientRepository.instance;
	}

	private constructor(dependency) {
		UserIngredientRepository.em = dependency.em;
	}

	async findByUserId(userId: number): Promise<UserIngredient[]> {
		return await UserIngredientRepository.em.find(UserIngredient, { where: { user: userId }, order: { count: 'DESC' } });
	}

	async findByUserIdAndIngredient(userId: number, ingredient: Ingredient): Promise<UserIngredient> {
		return await UserIngredientRepository.em.findOne(UserIngredient, { where: { user: userId, ingredient } });
	}
}
