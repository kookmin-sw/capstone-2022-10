import { EntityManager } from 'typeorm';
import User from '../user/entity';

import { AbsSubscribeRepository } from './type/repository';

export default class SubscribeRepository implements AbsSubscribeRepository {
	private static instance: AbsSubscribeRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsSubscribeRepository {
		if (!SubscribeRepository.instance) {
			SubscribeRepository.instance = new SubscribeRepository(dependency);
		}
		return SubscribeRepository.instance;
	}
	private constructor(dependency) {
		SubscribeRepository.em = dependency.em;
	}

	async changeSubscribe(user: User, star: User): Promise<void> {
		await SubscribeRepository.em.transaction(async (txem) => {
			await txem.getRepository(User).save(user);
			await txem.getRepository(User).save(star);
		});
	}
}
