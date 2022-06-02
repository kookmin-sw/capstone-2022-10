import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from './entity';

import { AbsUserRepository } from './type/repository';
import { AbsUserService } from './type/service';

import { BaseRecipeDTO } from '../recipe/type/dto';
import { UpdateUserDTO, ReadUserDetailDTO, ReadUserDTO, BaseUserDTO, LoginUserDTO } from './type/dto';
import UserError from './type/error';

interface TokenInfoObj {
	id: number;
}
const SALT_ROUNDS = 10;

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

	async getBaseUserDto(userId: number): Promise<BaseUserDTO> {
		const user = await UserService.userRepository.findById(userId);
		return new BaseUserDTO(user.id, user.nickname, user.thumbnailUrl);
	}

	async checkEmailDuplication(email: string): Promise<boolean> {
		const user = await UserService.userRepository.findByLoginId(email);
		return user ? false : true;
	}

	async getEncryptedPassword(loginPassword: string): Promise<string> {
		return await bcrypt.hash(loginPassword, SALT_ROUNDS);
	}

	async signup(loginId: string, loginPassword: string, confirmPassword: string): Promise<void | Error> {
		if (loginPassword !== confirmPassword) {
			throw new Error(UserError.PASSWORD_NOT_MATCH.message);
		}

		const findUser = await UserService.userRepository.findByLoginId(loginId);
		if (findUser) {
			throw new Error(UserError.USER_ID_EXISTS.message);
		}

		const encodedPassword = await this.getEncryptedPassword(loginPassword);

		const newUser = User.create(loginId, encodedPassword);
		await UserService.userRepository.save(newUser);
	}

	async signOut(userId: number): Promise<void | Error> {
		const user = await UserService.userRepository.findById(userId);
		if (!user) throw new Error(UserError.NOT_FOUND.message);

		await UserService.userRepository.remove(user);
	}

	async checkPasswordValidation(logInPassword: string, hashedUserPassword: string): Promise<boolean> {
		return await bcrypt.compare(logInPassword, hashedUserPassword);
	}

	async logIn(loginId: string, password: string): Promise<LoginUserDTO> {
		const user = await UserService.userRepository.findByLoginId(loginId);
		if (!user) throw new Error(UserError.NOT_FOUND.message);
		const isPasswordMatch = await this.checkPasswordValidation(password, user.loginPassword);
		if (!isPasswordMatch) throw new Error(UserError.PASSWORD_NOT_MATCH.message);

		// bug: id가 number가 아닌 string으로 저장되는 문제
		const tokenInfo: TokenInfoObj = { id: Number(user.id) };
		const userToken = jwt.sign(tokenInfo, process.env.JWT_SECRET);

		const userData = new BaseUserDTO(user.id, user.nickname, user.thumbnailUrl);

		return { jwt: userToken, user: userData };
	}

	async auth(token: string): Promise<number | Error> {
		const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenInfoObj;
		const userId = decoded.id;
		if (!userId) throw new Error(UserError.NOT_FOUND.message);

		return userId;
	}

	async updateThumbnail(userId: number, thumbnailUrl: string): Promise<void | Error> {
		const user = await UserService.userRepository.findById(userId);

		if (!user) throw new Error(UserError.NOT_FOUND.message);
		user.thumbnailUrl = thumbnailUrl;

		await UserService.userRepository.save(user);
	}

	async updateUserInfomation(userId: number, updateUserInfomation: UpdateUserDTO): Promise<void | Error> {
		const { loginPassword, confirmPassword } = updateUserInfomation;
		if (loginPassword !== confirmPassword) throw new Error(UserError.PASSWORD_NOT_MATCH.message);

		const user = await UserService.userRepository.findById(userId);
		if (!user) throw new Error(UserError.NOT_FOUND.message);

		// 비밀번호를 변경하지 않았을 때에도 암호화 할 것인지 고민
		const encodedPassword = await this.getEncryptedPassword(updateUserInfomation.loginPassword);

		user.loginPassword = encodedPassword;
		user.nickname = updateUserInfomation.nickname;
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

	async getTodayChef(): Promise<BaseUserDTO[] | Error> {
		const users = await UserService.userRepository.getTodayChef();
		return users.map((user) => new BaseUserDTO(user.USER_ID, user.NICKNAME, user.THUMBNAIL_URL));
	}
}
