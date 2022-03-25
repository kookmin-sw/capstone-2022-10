import { AbsUserRepository } from '../../user/type/repository';
import { AbsSubscribeRepository } from './repository';

export abstract class AbsSubscribeService {
	private static instance: AbsSubscribeService;
	private static subscribeRepository: AbsSubscribeRepository;
	private static userRepository: AbsUserRepository;

	public static getInstance(dependency): AbsSubscribeService;
	private constructor(dependency);

	changeSubscribe(userId: number, starId: number): Promise<void | Error>;
}
