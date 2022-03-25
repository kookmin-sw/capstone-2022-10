import { EntityManager } from 'typeorm';

import User from '../../user/entity';

export abstract class AbsSubscribeRepository {
	private static instance: AbsSubscribeRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsSubscribeRepository;
	private constructor(dependency);

	changeSubscribe(user: User, star: User): Promise<void>;
}
