import express, { Request, Response } from 'express';

import { AbsUserController, IRequest } from './type/controller';
import { AbsUserService } from './type/service';

import { ServerError } from '../helper/helper';
import UserError from './type/error';
import { mustAuth } from '../helper/middleware';

export default class UserController implements AbsUserController {
	private static instance: AbsUserController;
	private static userService: AbsUserService;
	private static readonly router = express.Router();
	private static readonly PATH = '/api/users';

	public static getInstance(dependency): AbsUserController {
		if (!UserController.instance) {
			UserController.instance = new UserController(dependency);
		}
		return UserController.instance;
	}

	private constructor(dependency) {
		UserController.userService = dependency.userService;
		this.initRouter(dependency.app);
	}

	initRouter(app: express.Application): void {
		if (UserController.instance) return;

		UserController.router.get('/search', this.getByNickname);
		UserController.router.get('/today-chef', this.getTodayChef);
		UserController.router.get('/base-dto', mustAuth, this.getBaseDto);
		UserController.router.get('/:id', this.getById);

		UserController.router.post('/check-duplication', this.checkDuplicateEmail);
		UserController.router.post('/signup', this.signup);
		UserController.router.post('/login', UserController.logIn);
		UserController.router.post('/logout', mustAuth, this.logOut);

		UserController.router.patch('/', mustAuth, this.updateUserInfomation);
		UserController.router.put('/thumbnail', mustAuth, this.updateThumbnail);

		UserController.router.delete('/', mustAuth, this.signOut);

		app.use(UserController.PATH, UserController.router);
	}

	async getBaseDto(req: IRequest, res: Response): Promise<void> {
		try {
			const { userId } = req.body;
			const baseUserDto = await UserController.userService.getBaseUserDto(userId);
			res.status(200).send(baseUserDto);
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_FOUND:
					res.status(UserError.NOT_FOUND.code).send(UserError.NOT_FOUND.message);
					break;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
			}
		}
	}

	async checkDuplicateEmail(req: IRequest, res: Response): Promise<void> {
		try {
			const { email } = req.body;
			const idDuplicated = await UserController.userService.checkEmailDuplication(email);
			res.status(200).send({ idDuplicated });
		} catch (error) {
			switch (error.message) {
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async signup(req: Request, res: Response): Promise<void> {
		try {
			const { loginId, loginPassword, confirmPassword } = req.body;
			await UserController.userService.signup(loginId, loginPassword, confirmPassword);
			UserController.logIn(req, res);
		} catch (error) {
			switch (error.message) {
				case UserError.USER_ID_EXISTS.message:
					res.status(UserError.USER_ID_EXISTS.code).send(UserError.USER_ID_EXISTS.message);
					return;
				case UserError.PASSWORD_NOT_MATCH.message:
					res.status(UserError.PASSWORD_NOT_MATCH.code).send(UserError.PASSWORD_NOT_MATCH.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async signOut(req: IRequest, res: Response): Promise<void> {
		try {
			const { userId } = req.body;
			await UserController.userService.signOut(userId);

			res.status(204).send();
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_AUTHORIZED.message:
					res.status(UserError.NOT_AUTHORIZED.code).send(UserError.NOT_AUTHORIZED.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	static async logIn(req: Request, res: Response): Promise<void> {
		try {
			const { loginId, loginPassword } = req.body;
			const { jwt, user } = await UserController.userService.logIn(loginId, loginPassword);
			res.status(200).cookie('jwt', jwt).send({ user, jwt });
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_FOUND.message:
					res.status(UserError.NOT_FOUND.code).send(UserError.NOT_FOUND.message);
					return;
				case UserError.PASSWORD_NOT_MATCH.message:
					res.status(UserError.PASSWORD_NOT_MATCH.code).send(UserError.PASSWORD_NOT_MATCH.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async logOut(req: Request, res: Response): Promise<void> {
		try {
			res.cookie('x_auth', '').status(204).send();
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_AUTHORIZED.message:
					res.status(UserError.NOT_AUTHORIZED.code).send(UserError.NOT_AUTHORIZED.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async updateThumbnail(req: IRequest, res: Response): Promise<void> {
		try {
			const { userId, thumbnailUrl } = req.body;

			await UserController.userService.updateThumbnail(userId, thumbnailUrl);

			res.status(204).send();
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_AUTHORIZED.message:
					res.status(UserError.NOT_AUTHORIZED.code).send(UserError.NOT_AUTHORIZED.message);
					return;
				case UserError.NOT_FOUND.message:
					res.status(UserError.NOT_FOUND.code).send(UserError.NOT_FOUND.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async updateUserInfomation(req: IRequest, res: Response): Promise<void> {
		try {
			const { userId, updateUserInfomation } = req.body;

			await UserController.userService.updateUserInfomation(userId, updateUserInfomation);

			res.status(204).send();
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_AUTHORIZED.message:
					res.status(UserError.NOT_AUTHORIZED.code).send(UserError.NOT_AUTHORIZED.message);
					return;
				case UserError.PASSWORD_NOT_MATCH.message:
					res.status(UserError.PASSWORD_NOT_MATCH.code).send(UserError.PASSWORD_NOT_MATCH.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async getById(req: Request, res: Response): Promise<void> {
		try {
			const targetUserId = Number(req.params.id);
			const findUser = await UserController.userService.findById(targetUserId);

			res.status(200).send(findUser);
		} catch (error) {
			switch (error.message) {
				case UserError.NOT_FOUND.message:
					res.status(UserError.NOT_FOUND.code).send(UserError.NOT_FOUND.message);
					return;
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async getByNickname(req: Request, res: Response): Promise<void> {
		try {
			const nickname = String(req.query.nickname);
			const findUsers = await UserController.userService.findByNickname(nickname);

			res.status(200).send(findUsers);
		} catch (error) {
			switch (error.message) {
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}

	async getTodayChef(req: Request, res: Response): Promise<void> {
		try {
			const users = await UserController.userService.getTodayChef();
			res.status(200).send(users);
		} catch (error) {
			switch (error.message) {
				default:
					res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
					return;
			}
		}
	}
}
