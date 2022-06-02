import 'reflect-metadata';
import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import express from 'express';

import cors from 'cors';
import cookieParser from 'cookie-parser';

import Container from './container';

export default class Application {
	private static readonly app: express.Application = express();
	private static initialized: Application;

	public static async initialize(): Promise<void> {
		if (!Application.initialized) {
			Application.initMiddleware();
			const connection = await Application.initDatabase();
			Container.initContainer(Application.app, connection);
			Application.initApplication();
		}
		return;
	}

	private static initMiddleware(): void {
		Application.app.use(express.json());
		Application.app.use(
			cors({
				origin: process.env.NODE_ENV === 'production' ? '*' : 'http://localhost:3000',
				credentials: true,
			})
		);
		Application.app.use(express.urlencoded({ extended: true }));
		Application.app.use(cookieParser());
	}

	private static async initDatabase(): Promise<Connection> {
		const connectionOption = await getConnectionOptions(process.env.NODE_ENV);
		return await createConnection({ ...connectionOption });
	}

	private static initApplication(): void {
		Application.app.listen(4000);
	}
}

Application.initialize();
