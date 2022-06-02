import { RowDataPacket } from 'mysql2';
import { EntityManager } from 'typeorm';
import Ingredient from '../ingredient/entity';

import recipeIngredientEntity from './entity';
import RecipeIngredient from './entity';

import { AbsRecipeIngredientRepository } from './type/repository';

export default class RecipeIngredientRepository implements AbsRecipeIngredientRepository {
	private static instance: AbsRecipeIngredientRepository;
	private static em: EntityManager;
	private static INCLUDE_THRESHOLD = 0.5;

	static getInstance(dependency): AbsRecipeIngredientRepository {
		if (!RecipeIngredientRepository.instance) {
			RecipeIngredientRepository.instance = new RecipeIngredientRepository(dependency);
		}
		return RecipeIngredientRepository.instance;
	}

	private constructor(dependency) {
		RecipeIngredientRepository.em = dependency.em;
	}

	async findAll(): Promise<recipeIngredientEntity[]> {
		return await RecipeIngredientRepository.em.getRepository(RecipeIngredient).find();
	}

	private makeTuple(ingredients: Ingredient[]) {
		let queryString = '';
		ingredients.forEach(
			(ingredient, index) => (queryString += index !== ingredients.length - 1 ? `${ingredient.id},` : `${ingredient.id}`)
		);
		return queryString;
	}

	async findByIngredients(ingredients: Ingredient[]): Promise<RowDataPacket[]> {
		const queryString = this.makeTuple(ingredients);

		return await RecipeIngredientRepository.em.query(`
			select subTable.recipeId as recipeId 
			from (select ri.recipe_id as recipeId, count(*) / ${ingredients.length} as includeRate
					from RECIPE_INGREDIENT as ri
					where ri.ingredient_id in (${queryString})
					group by ri.recipe_id) as subTable
			where subTable.includeRate > ${RecipeIngredientRepository.INCLUDE_THRESHOLD}
		`);
	}

	async delete(recipeIngredient: RecipeIngredient): Promise<void> {
		await RecipeIngredientRepository.em.delete(RecipeIngredient, recipeIngredient);
	}
}
