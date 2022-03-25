import { EntityManager } from 'typeorm';

import Tag from '../entity';

export abstract class AbsTagRepository {
	private static instance: AbsTagRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsTagRepository;
	private constructor(dependency);

	findTagByName(name: string): Promise<Tag>;
	findById(id: number): Promise<Tag>;
}
