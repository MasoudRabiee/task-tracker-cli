import { Command } from "commander";

export abstract class AbstractCommand {
	constructor() {}

	public abstract load(program: Command): void;
}
