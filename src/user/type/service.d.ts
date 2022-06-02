import { AbsUserRepository } from './repository';

import { ReadUserDTO, ReadUserDetailDTO, UpdateUserDTO, BaseUserDTO, LoginUserDTO } from './dto';

export abstract class AbsUserService {
	private static instance: AbsUserService;
	private static userRepository: AbsUserRepository;

	public static getInstance(dependency): AbsUserService;
	private constructor(dependency);

	getBaseUserDto(userId: number): Promise<BaseUserDTO>;
	checkEmailDuplication(email: string): Promise<boolean>;

	getEncryptedPassword(loginPassword: string): Promise<string>;
	checkPasswordValidation(loginPassword: string, confirmPassword: string): Promise<boolean>;

	signup(loginId: string, loginPassword: string, confirmPassword: string): Promise<void | Error>;
	signOut(userId: number): Promise<void | Error>;

	logIn(loginId: string, password: string): Promise<LoginUserDTO>;
	auth(token: string): Promise<number | Error>;

	findById(id: number): Promise<ReadUserDetailDTO | Error>;
	findByNickname(nickname: string): Promise<ReadUserDTO[] | Error>;
	getTodayChef(): Promise<BaseUserDTO[] | Error>;

	updateThumbnail(userId: number, thumbnailUrl: string): Promise<void | Error>;
	updateUserInfomation(userId: number, updateUserInfomation: UpdateUserDTO): Promise<void | Error>;
}
