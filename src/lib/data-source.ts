import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Task } from "./entities/task.entity";

dotenv.config();

export const AppDataSource = new DataSource({
	type: "mssql",
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	synchronize: true, // TODO: disable it for production
	logging: false,
	entities: [Task],
	migrations: [],
	subscribers: [],
	options: {
		trustServerCertificate: true,
	},
});

// AppDataSource.initialize()
// 	.then(() => {
// 		console.log("DataSource has been initialized !");
// 	})
// 	.catch((err) => {
// 		console.log("Error During initializing DataSource, Error msg =>", err);
// 	});
