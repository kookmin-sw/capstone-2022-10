import { EntityManager } from 'typeorm';
import { RowDataPacket } from 'mysql2';

import Recipe from './entity';

import { getFormattedDate } from '../helper/helper';

import { AbsRecipeRepository } from './type/repository';
import { ModifyRecipeDTO } from './type/dto';

export default class RecipeRepository implements AbsRecipeRepository {
	private static instance: AbsRecipeRepository;
	private static em: EntityManager;
	private static SEARCH_LIMIT = 6;

	public static getInstance(dependency): AbsRecipeRepository {
		if (!RecipeRepository.instance) {
			RecipeRepository.instance = new RecipeRepository(dependency);
		}
		return RecipeRepository.instance;
	}

	private constructor(dependency) {
		RecipeRepository.em = dependency.em;
	}

	async remove(recipe: Recipe): Promise<void> {
		await RecipeRepository.em.remove(recipe);
	}

	create(rawRecipe: ModifyRecipeDTO): Recipe {
		return RecipeRepository.em.create(Recipe, { title: rawRecipe.title });
	}

	async save(recipe: Recipe): Promise<number> {
		return (await RecipeRepository.em.save(recipe)).id;
	}

	async findById(id: number): Promise<Recipe> {
		return await RecipeRepository.em.findOne(Recipe, id);
	}

	async findByIds(ids: number[]): Promise<Recipe[]> {
		return await RecipeRepository.em
			.getRepository(Recipe)
			.createQueryBuilder('recipe')
			.select()
			.where('recipe.id in (:ids)', { ids })
			.getMany();
	}

	async findByTitle(title: string): Promise<Recipe[]> {
		return await RecipeRepository.em
			.getRepository(Recipe)
			.createQueryBuilder('recipe')
			.select()
			.where(`recipe.title like :title`, { title: `%${title}%` })
			.getMany();
	}

	async findByTodaysMostLiked(): Promise<Recipe[]> {
		return await RecipeRepository.em
			.getRepository(Recipe)
			.createQueryBuilder('recipe')
			.select()
			.where('date(recipe.date.createdDate) = :today', { today: getFormattedDate(new Date()) })
			.orderBy('recipe.numberOfLike', 'DESC')
			.limit(RecipeRepository.SEARCH_LIMIT)
			.getMany();
	}

	async findByLatestCreated(): Promise<Recipe[]> {
		return await RecipeRepository.em
			.getRepository(Recipe)
			.createQueryBuilder('recipe')
			.select()
			.orderBy('recipe.date.createdDate', 'DESC')
			.limit(RecipeRepository.SEARCH_LIMIT)
			.getMany();
	}

	async findBySubscribingChefsLatest(id: number): Promise<RowDataPacket[]> {
		return await RecipeRepository.em.query(`
			select * 
			from RECIPE as r 
			where (r.user_id, r.create_date) in (
				SELECT r.user_id, max(r.create_date) 
				FROM (
					select STAR_ID 
					from SUBSCRIBE 
					where FAN_ID = ${id}) as p JOIN RECIPE as r ON p.STAR_ID = r.USER_ID 
				group by r.user_id
			);`);
	}

	async findAll(): Promise<Recipe[]> {
		return await RecipeRepository.em.getRepository(Recipe).find();
	}

	async findRandomRecipe(count: number): Promise<RowDataPacket[]> {
		return await RecipeRepository.em.query(`select * from RECIPE order by rand() limit ${count}`);
	}
}
