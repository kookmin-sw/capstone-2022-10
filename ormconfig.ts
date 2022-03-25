import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';

const ormconfig: ConnectionOptions[] = [
	{
		name: 'production',
		type: 'mysql',
		host: process.env.DB_PROD_HOST,
		port: Number(process.env.DB_PROD_PORT),
		username: process.env.DB_PROD_USERNAME,
		password: process.env.DB_PROD_PASSWORD,
		database: process.env.DB_PROD_DATABASENAME,
		synchronize: false,
		logging: true,
		entities: ['src/**/entity.ts'],
		extra: {
			connectionLimit: 20,
			waitForConnections: true,
		},
		connectTimeout: 3000,
	},
	{
		name: 'local',
		type: 'mysql',
		host: process.env.DB_LOCAL_HOST,
		port: Number(process.env.DB_LOCAL_PORT),
		username: process.env.DB_LOCAL_USERNAME,
		password: process.env.DB_LOCAL_PASSWORD,
		database: process.env.DB_LOCAL_DATABASENAME,
		synchronize: true,
		logging: true,
		entities: ['src/**/entity.ts'],
		extra: {
			connectionLimit: 20,
			waitForConnections: true,
		},
		connectTimeout: 3000,
	},
	{
		name: 'test',
		type: 'mysql',
		host: process.env.DB_TEST_HOST,
		port: Number(process.env.DB_TEST_PORT),
		username: process.env.DB_TEST_USERNAME,
		password: process.env.DB_TEST_PASSWORD,
		database: process.env.DB_TEST_DATABASENAME,
		synchronize: true,
		dropSchema: true,
		entities: ['src/**/entity.ts'],
		extra: {
			connectionLimit: 20,
			waitForConnections: true,
		},
		connectTimeout: 3000,
	},
];

export default ormconfig;
