import Tag from '../entity';

import { AbsTagRepository } from './repository';

export abstract class AbsTagService {
	private static instance: AbsTagService;
	private static tagRepository: AbsTagRepository;

	public static getInstance(dependency): AbsTagService;
	private constructor(dependency);

	findTagByName(name: string): Promise<Tag | Error>;
}
