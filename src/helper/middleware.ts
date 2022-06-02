import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ServerError } from './helper';

async function mustAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const requestHeader = req.headers['authorization'];
		const accessToken = requestHeader && requestHeader.split(' ')[1];

		if (!accessToken || accessToken === 'null' || accessToken === 'undefined') {
			res.status(401).send({ msg: 'undefined JWT' });
			return;
		}

		const userId = Object.values(jwt.verify(accessToken, process.env.JWT_SECRET))[0];
		if (!userId) {
			res.status(401).send({ msg: 'invalid JWT' });
			return;
		}

		req.body.userId = Number(userId);
		next();
	} catch (error) {
		res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
		return;
	}
}

async function optionalAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const requestHeader = req.headers['authorization'];
		const accessToken = requestHeader && requestHeader.split(' ')[1];

		if (!accessToken || accessToken === 'null' || accessToken === 'undefined') {
			req.body.userId = undefined;
			next();
			return;
		}

		const userId = Object.values(jwt.verify(accessToken, process.env.JWT_SECRET))[0];
		if (!userId) {
			req.body.userId = undefined;
			next();
			return;
		}

		req.body.userId = Number(userId);
		next();
	} catch (error) {
		res.status(ServerError.SERVER_ERROR.code).send(ServerError.SERVER_ERROR.message);
		return;
	}
}

export { mustAuth, optionalAuth };
