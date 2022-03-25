import { EntityManager } from 'typeorm';

import Tag from './entity';

import { AbsTagRepository } from './type/repository';

export default class TagRepository implements AbsTagRepository {
	private static instance: AbsTagRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsTagRepository {
		if (!TagRepository.instance) {
			TagRepository.instance = new TagRepository(dependency);
		}
		return TagRepository.instance;
	}

	private constructor(dependency) {
		TagRepository.em = dependency.em;
	}

	async findTagByName(name: string): Promise<Tag> {
		return await TagRepository.em.getRepository(Tag).findOne({ where: { name: name } });
	}

	async findById(id: number): Promise<Tag> {
		return await TagRepository.em.getRepository(Tag).createQueryBuilder('tag').select().where('tag.id=:id', { id }).getOne();
	}
}
