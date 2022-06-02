import User from '../entity';
import { BaseRecipeDTO } from '../../recipe/type/dto';

class BaseUserDTO {
	readonly id: number;
	readonly nickname: string;
	readonly thumbnailUrl: string;

	constructor(id: number, nickname: string, thumbnailUrl: string) {
		this.id = id;
		this.nickname = nickname;
		this.thumbnailUrl = thumbnailUrl;
	}
}

class ReadUserDTO extends BaseUserDTO {
	readonly description: string;
	readonly grade: string;
	readonly numberOfFan: number;
	readonly numberOfLike: number;

	constructor(user: User) {
		super(user.id, user.nickname, user.thumbnailUrl);
		this.description = user.description;
		this.numberOfLike = user.numberOfLike;
		this.numberOfFan = user.numberOfFan;
	}
}

class ReadUserDetailDTO extends ReadUserDTO {
	readonly myRecipe: BaseRecipeDTO[];
	readonly likeRecipe: BaseRecipeDTO[];
	readonly subscribingUser: BaseUserDTO[];

	constructor(user: User, myRecipe: BaseRecipeDTO[], likeRecipe: BaseRecipeDTO[], subscribingUser: BaseUserDTO[]) {
		super(user);
		this.myRecipe = myRecipe;
		this.likeRecipe = likeRecipe;
		this.subscribingUser = subscribingUser;
	}
}

interface LoginUserDTO {
	jwt: string;
	user: BaseUserDTO;
}

interface UpdateUserDTO {
	nickname: string;
	loginPassword: string;
	readonly confirmPassword: string;
	description: string;
}

export { BaseUserDTO, ReadUserDTO, ReadUserDetailDTO };
export type { UpdateUserDTO, LoginUserDTO };
