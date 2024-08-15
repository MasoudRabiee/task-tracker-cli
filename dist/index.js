#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const program = new commander_1.Command();
program
    .name("my-cli")
    .description("A simple CLI made with TypeScript")
    .version("1.0.0");
program
    .command("greet <name>")
    .description("Greet someone by name")
    .action((name) => {
    console.log(`Hello, ${name}!`);
});
program.parse(process.argv);
