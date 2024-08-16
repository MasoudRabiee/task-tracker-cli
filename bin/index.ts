#!/usr/bin/env node

import { Command } from "commander";
import { TaskCommand } from "../src/commands/task.command";

const bootstrap = async () => {
	const program = new Command();

	program
		.name("my-cli")
		.description("A Task Tracker CLI made with TypeScript")
		.version("1.0.0");

	program
		.command("greet <name>")
		.description("Greet someone by name")
		.action((name: string) => {
			console.log(`Hello, ${name}!`);
		});

	const taskCommandLoader = new TaskCommand();
	await taskCommandLoader.load(program);
	await program.parseAsync(process.argv);
};

bootstrap();
