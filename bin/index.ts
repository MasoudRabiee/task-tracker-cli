#!/usr/bin/env node

import { Command } from "commander";
const program = new Command();

program
	.name("my-cli")
	.description("A simple CLI made with TypeScript")
	.version("1.0.0");

program
	.command("greet <name>")
	.description("Greet someone by name")
	.action((name: string) => {
		console.log(`Hello, ${name}!`);
	});

program.parse(process.argv);
