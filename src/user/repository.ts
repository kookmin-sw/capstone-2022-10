import { EntityManager } from 'typeorm';
import { RowDataPacket } from 'mysql2';

import User from './entity';

import { AbsUserRepository } from './type/repository';
import { UpdateUserDTO } from './type/dto';

export default class UserRepository implements AbsUserRepository {
	private static instance: AbsUserRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsUserRepository {
		if (!UserRepository.instance) {
			UserRepository.instance = new UserRepository(dependency);
		}
		return UserRepository.instance;
	}

	private constructor(dependency) {
		UserRepository.em = dependency.em;
	}

	async save(user: User): Promise<void> {
		await UserRepository.em.save(user);
	}

	async remove(user: User): Promise<void> {
		await UserRepository.em.remove(user);
	}

	async updateUserInfomation(id: number, updateUserInfomation: UpdateUserDTO): Promise<void> {
		const { nickname, loginPassword, description } = updateUserInfomation;
		await UserRepository.em
			.createQueryBuilder()
			.update(User)
			.set({ nickname, loginPassword, description })
			.where('id = :id', { id })
			.execute();
	}

	async findById(id: number): Promise<User> {
		return await UserRepository.em.findOne(User, id);
	}

	async findByNickname(nickname: string): Promise<User[]> {
		return await UserRepository.em
			.getRepository(User)
			.createQueryBuilder('user')
			.select()
			.where('user.nickname like :nickname', { nickname: `%${nickname}%` })
			.getMany();
	}

	async findByLoginId(loginId: string): Promise<User> {
		return await UserRepository.em.findOne(User, { where: { loginId } });
	}

	async getTodayChef(): Promise<RowDataPacket[]> {
		return await UserRepository.em.query(`
			select * from USER order by rand() limit 6
		`);
	}
}
