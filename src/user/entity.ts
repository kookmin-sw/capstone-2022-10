import { Column, Entity, Generated, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';

import DateInfo from '../dateInfo/entity';
import Recipe from '../recipe/entity';
import UserIngredient from '../userIngredient/entity';

export enum loginMethod {
	LOCAL = 'local',
	GOOGLE = 'google',
	FACEBOOK = 'facebook',
	KAKAO = 'kakao',
	NAVER = 'naver',
}

export enum grade {
	LEVEL1 = 1,
	LEVEL2 = 2,
	LEVEL3 = 3,
	LEVEL4 = 4,
	LEVEL5 = 5,
}

const DEFAULT_THUMBNAIL_PATH = '/image/icon/header/defaultProfile.png';

@Entity({ name: 'USER' })
export default class User {
	@PrimaryColumn({ name: 'USER_ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@OneToMany(() => Recipe, (recipe) => recipe.user, { lazy: true })
	recipes: Promise<Recipe[]>;

	@ManyToMany(() => Recipe, (recipe) => recipe.likeUsers, { lazy: true, nullable: false })
	@JoinTable({ name: 'BOOKMARK', joinColumn: { name: 'USER_ID' }, inverseJoinColumn: { name: 'RECIPE_ID' } })
	bookmarks: Recipe[];

	// 나를 구독하는 사람들
	@ManyToMany(() => User, (user) => user.stars, { lazy: true, nullable: false })
	@JoinTable({ name: 'SUBSCRIBE', joinColumn: { name: 'STAR_ID' }, inverseJoinColumn: { name: 'FAN_ID' } })
	fans: User[];

	// 내가 구독하는 사람들
	@ManyToMany(() => User, (user) => user.fans, { lazy: true, nullable: false })
	stars: User[];

	@OneToMany(() => UserIngredient, (userIngredient) => userIngredient.user, { lazy: true, cascade: true })
	ingredients: UserIngredient[];

	@Column(() => DateInfo, { prefix: false })
	date: DateInfo;

	//회원가입 기본 정보
	@Column({
		name: 'LOGIN_ID',
		type: 'varchar',
		length: 50,
		nullable: false,
		unique: true,
	})
	loginId: string;

	//회원가입 기본 정보
	@Column({ name: 'LOGIN_PASSWORD', type: 'varchar', length: 100, nullable: false })
	loginPassword: string;

	@Column({ name: 'LOGIN_METHOD', type: 'enum', enum: loginMethod, default: loginMethod.LOCAL, nullable: false })
	loginMethod: loginMethod;

	//회원가입 기본 정보
	@Column({ name: 'NICKNAME', type: 'varchar', length: 50, nullable: false, unique: true })
	nickname: string;

	@Column({ name: 'THUMBNAIL_URL', type: 'varchar', length: 2048, default: DEFAULT_THUMBNAIL_PATH, nullable: false })
	thumbnailUrl: string;

	@Column({
		name: 'DESCRIPTION',
		type: 'varchar',
		default: 'hello!',
		length: 900,
		nullable: false,
	})
	description: string;

	@Column({ name: 'GRADE', type: 'enum', enum: grade, default: grade.LEVEL1 })
	grade: grade;

	@Column({ name: 'NUMBER_OF_LIKE', type: 'int', default: 0, nullable: false, unsigned: true })
	numberOfLike: number;

	@Column({ name: 'NUMBER_OF_FAN', type: 'int', default: 0, nullable: false, unsigned: true })
	numberOfFan: number;

	static create(loginId: string, loginPassword: string): User {
		const user = new User();
		user.loginId = loginId;
		user.loginPassword = loginPassword;
		user.nickname = loginId;
		return user;
	}
}
