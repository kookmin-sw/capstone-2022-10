import { ReadRecipeDTO } from '../../recipe/type/dto';

export abstract class AbsRecipeTagService {
	private static instance: AbsRecipeTagService;

	public static getInstance(dependency): AbsRecipeTagService;
	private constructor(dependency);

	getRecipeByTag(tagName: string): Promise<ReadRecipeDTO[]>;
}
