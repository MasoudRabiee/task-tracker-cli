import { Command } from "commander";
import { isNamedTupleMember } from "typescript";
import { TaskRepository } from "../lib/repositories/task.repository";
import { Status } from "../utils/enums/status.enum";
import { isValidEnumValue } from "../utils/enumvalue.validation";
import { AbstractCommand } from "./abstract.command";

export class TaskCommand extends AbstractCommand {
	public async load(program: Command): Promise<void> {
		// Add Task
		program
			.command("add <taskName...>")
			.description("Add new task")
			.action(async (taskNames: string[]) => {
				const taskName = taskNames.join(" ");
				const taskRepository = await TaskRepository.createInstance();
				const recordId = await taskRepository.createTask({
					name: taskName,
					status: Status.todo,
					createdAt: new Date(),
					updatedAt: new Date(),
				});
				if (recordId > 0) {
					console.log(`Task added successfully (ID: ${recordId})`);
				} else {
					console.log("Somethings wrong ...!");
				}
			});

		// Lists of Tasks
		program
			.command("list [status...]")
			.description(
				"Showing the list of tasks. Also show Tasks based on status"
			)
			.action(async (status: string[] = []) => {
				if (status.length == 0 || isValidEnumValue(Status, status.join(" "))) {
					const enteredStatus =
						status.join(" ") === "" ? null : status.join(" ");
					const taskRepository =
						await TaskRepository.createInstance();
					const tasks = await taskRepository.showLists(enteredStatus);
					for (const task of tasks) {
						console.log(task);
					}
				} else {
					console.log(
						"Status must be one of these => [todo , done , in-progress]"
					);
				}
			});

		// Update Task
		program
			.command("update <idNumber> <taskNames...>")
			.description("Update the name of Task (Based on TaskID)")
			.action(async (idNumber: number, taskNames: string[]) => {
				const newTaskName = taskNames.join(" ");
				const taskRepository = await TaskRepository.createInstance();
				const updatedRecordId = await taskRepository.updateTask(
					idNumber,
					newTaskName
				);
				if (updatedRecordId > 0) {
					console.log(
						`Task updated successfully (ID: ${updatedRecordId})`
					);
				} else {
					console.log("Somethings wrong ...!");
				}
			});

		// Delete Task
		program
			.command("delete <idNumber>")
			.description("Delete the Task")
			.action(async (idNumber: number) => {
				const taskRepository = await TaskRepository.createInstance();
				const deletedRecordId = await taskRepository.deleteTask(
					idNumber
				);
				if (deletedRecordId > 0) {
					console.log(`Task deleted successfully ...`);
				} else {
					console.log("Somethings wrong ...!");
				}
			});

		// Change Status (mark)
		program
			.command("mark <IdNumber> <status>")
			.description(
				"Change the status of task [todo , done , in-progress]"
			)
			.action(async (idNumber: number, status: string) => {
				if (isValidEnumValue(Status, status)) {
					const taskRepository =
						await TaskRepository.createInstance();
					const recordId = await taskRepository.changeStatus(
						idNumber,
						status
					);
					if (recordId > 0) {
						console.log(
							`Task status updated successfully (ID: ${recordId})`
						);
					} else {
						console.log("Somethings wrong ...!");
					}
				} else {
					console.log(
						"Status must be one of these => [todo , done , in-progress]"
					);
				}
			});
	}
}
