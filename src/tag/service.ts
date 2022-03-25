import Tag from './entity';

import { AbsTagRepository } from './type/repository';
import { AbsTagService } from './type/service';

export default class TagService implements AbsTagService {
	private static tagRepository: AbsTagRepository;
	private static instance: AbsTagService;

	public static getInstance(dependency): AbsTagService {
		if (!TagService.instance) {
			TagService.instance = new TagService(dependency);
		}
		return TagService.instance;
	}

	private constructor(dependency) {
		TagService.tagRepository = dependency.tagRepository;
	}

	async findTagByName(name: string): Promise<Tag | Error> {
		return await TagService.tagRepository.findTagByName(name);
	}
}
