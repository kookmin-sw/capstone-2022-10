import { AbsSubscribeService } from './type/service';
import { AbsUserRepository } from '../user/type/repository';
import { AbsSubscribeRepository } from './type/repository';
import UserError from '../user/type/error';

export default class SubscribeService implements AbsSubscribeService {
	private static instance: AbsSubscribeService;
	private static subscribeRepository: AbsSubscribeRepository;
	private static userRepository: AbsUserRepository;

	public static getInstance(dependency): AbsSubscribeService {
		if (!SubscribeService.instance) {
			SubscribeService.instance = new SubscribeService(dependency);
		}
		return SubscribeService.instance;
	}
	private constructor(dependency) {
		SubscribeService.subscribeRepository = dependency.subscribeRepository;
		SubscribeService.userRepository = dependency.userRepository;
	}

	async checkSubscription(userId: number, starId: number): Promise<boolean> {
		const user = await SubscribeService.userRepository.findById(userId);
		const star = await SubscribeService.userRepository.findById(starId);

		if (!user || !star) throw new Error(UserError.NOT_FOUND.message);

		return (await user.stars).filter((star) => Number(star.id) === starId).length !== 0;
	}

	async changeSubscribe(userId: number, starId: number): Promise<boolean | Error> {
		const user = await SubscribeService.userRepository.findById(userId);
		const star = await SubscribeService.userRepository.findById(starId);

		if (!user || !star) throw new Error(UserError.NOT_FOUND.message);

		let isSubscription = false;

		const subscribeList = await user.stars;
		const index = subscribeList.findIndex((subscribedUser) => subscribedUser.id == starId);
		if (index === -1) {
			subscribeList.push(star);
			star.numberOfFan++;
			isSubscription = true;
		} else {
			subscribeList.splice(index, 1);
			star.numberOfFan--;
		}

		user.stars = subscribeList;
		await SubscribeService.subscribeRepository.changeSubscribe(user, star);

		return isSubscription;
	}
}
