import { RowDataPacket } from 'mysql2';
import { EntityManager } from 'typeorm';

import User from '../entity';

import { UpdateUserDTO } from './dto';

export abstract class AbsUserRepository {
	private static instance: AbsUserRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsUserRepository;
	private constructor(dependency);

	save(user: User): Promise<void>;
	remove(user: User): Promise<void>;

	updateUserInfomation(id: number, updateUserInfomation: UpdateUserDTO): Promise<void>;

	findById(id: number): Promise<User>;
	findByNickname(nickname: string): Promise<User[]>;
	findByLoginId(loginId: string): Promise<User>;
	getTodayChef(): Promise<RowDataPacket[]>;
}
