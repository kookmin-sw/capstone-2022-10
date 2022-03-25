import User from './entity';

import { AbsUserRepository } from './type/repository';
import { AbsUserService } from './type/service';

import { BaseRecipeDTO } from '../recipe/type/dto';
import { UpdateUserDTO, ReadUserDetailDTO, ReadUserDTO, CreateUserDTO, BaseUserDTO } from './type/dto';
import UserError from './type/error';

export default class UserService implements AbsUserService {
	private static instance: AbsUserService;
	private static userRepository: AbsUserRepository;

	public static getInstance(dependency): AbsUserService {
		if (!UserService.instance) {
			UserService.instance = new UserService(dependency);
		}
		return UserService.instance;
	}

	private constructor(dependency) {
		UserService.userRepository = dependency.userRepository;
	}

	async signIn(createUserInformation: CreateUserDTO): Promise<BaseUserDTO | Error> {
		if (createUserInformation.loginPassword !== createUserInformation.confirmPassword)
			throw new Error(UserError.PASSWORD_NOT_MATCH.message);

		const findUser = await UserService.userRepository.findByLoginId(createUserInformation.loginId);
		if (findUser) throw new Error(UserError.USER_ID_EXISTS.message);

		const newUser = User.create(createUserInformation);
		await UserService.userRepository.save(newUser);

		const userDto = new BaseUserDTO(newUser.id, newUser.nickname, newUser.thumbnailUrl);

		return userDto;
	}

	async signOut(userId: number): Promise<void | Error> {
		const user = await UserService.userRepository.findById(userId);
		if (!user) throw new Error(UserError.NOT_FOUND.message);

		await UserService.userRepository.remove(user);
	}

	async updateThumbnail(targetUserId: number, userId: number, thumbnailUrl: string): Promise<void | Error> {
		if (targetUserId !== userId) throw new Error(UserError.NOT_AUTHORIZED.message);

		await UserService.userRepository.updateThumbnail(userId, thumbnailUrl);
	}

	async deleteThumbnail(targetUserId: number, userId: number): Promise<void> {
		if (targetUserId !== userId) throw new Error(UserError.NOT_AUTHORIZED.message);

		await UserService.userRepository.deleteThumbnail(userId);
	}

	async updateUserInfomation(targetUserId: number, userId: number, updateUserInfomation: UpdateUserDTO): Promise<void | Error> {
		const { loginPassword, confirmPassword } = updateUserInfomation;
		if (loginPassword !== confirmPassword) throw new Error(UserError.PASSWORD_NOT_MATCH.message);
		if (targetUserId !== userId) throw new Error(UserError.NOT_AUTHORIZED.message);

		const user = await UserService.userRepository.findById(targetUserId);
		if (!user) throw new Error(UserError.NOT_FOUND.message);

		user.nickname = updateUserInfomation.nickname;
		user.loginPassword = updateUserInfomation.loginPassword;
		user.description = updateUserInfomation.description;

		await UserService.userRepository.save(user);
	}

	async findById(id: number): Promise<ReadUserDetailDTO | Error> {
		const user = await UserService.userRepository.findById(id);
		if (!user) throw new Error(UserError.NOT_FOUND.message);

		const rawMyRecipe = await user.recipes;
		const baseMyRecipe = rawMyRecipe.map((rawRecipe) => {
			return new BaseRecipeDTO(rawRecipe.id, rawRecipe.title, rawRecipe.thumbnailUrl);
		});

		const rawLikeRecipe = await user.bookmarks;
		const baseLikeRecipe = rawLikeRecipe.map((rawRecipe) => {
			return new BaseRecipeDTO(rawRecipe.id, rawRecipe.title, rawRecipe.thumbnailUrl);
		});

		const rawSubscribingUser = await user.stars;
		const baseSbuscribingUser = rawSubscribingUser.map((rawUser) => {
			return new BaseUserDTO(rawUser.id, rawUser.nickname, rawUser.thumbnailUrl);
		});

		return new ReadUserDetailDTO(user, baseMyRecipe, baseLikeRecipe, baseSbuscribingUser);
	}

	async findByNickname(nickname: string): Promise<ReadUserDTO[] | Error> {
		const users = await UserService.userRepository.findByNickname(nickname);

		return users.length === 0 ? [] : await Promise.all(users.map(async (user) => new ReadUserDTO(user)));
	}
}
