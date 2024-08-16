import { Repository } from "typeorm";
import { Status } from "../../utils/enums/status.enum";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/task.entity";

export class TaskRepository {
	private repository: Repository<Task>;

	private constructor() {}

	private static async initializeRepository(): Promise<TaskRepository> {
		const instance = new TaskRepository();

		if (!AppDataSource.isInitialized) {
			await AppDataSource.initialize()
				.then(() => {
					console.log(
						"DataSource has been initialized automatically!"
					);
				})
				.catch((err) => {
					console.error(
						"Error during DataSource initialization:",
						err
					);
					throw err;
				});
		}

		instance.repository = AppDataSource.getRepository(Task);
		return instance;
	}

	public static async createInstance(): Promise<TaskRepository> {
		return this.initializeRepository();
	}

	private async closeConnection(): Promise<void> {
		if (AppDataSource.isInitialized) {
			await AppDataSource.destroy();
			console.log("DataSource has been closed.");
		}
	}

	async createTask(task: Omit<Task, "id">): Promise<number> {
		const newTask = this.repository.create(task);
		const { id } = await this.repository.save(newTask);
		await this.closeConnection();
		return id;
	}

	async updateTask(id: number, newName: string): Promise<number> {
		const task = await this.repository.findOneBy({ id: id });
		if (task) {
			task.name = newName;
			task.updatedAt = new Date();
			const { id: updatedId } = await this.repository.save(task);
			await this.closeConnection();
			return updatedId;
		}
		await this.closeConnection();
		return -1;
	}

	async changeStatus(id: number, newStatus: string): Promise<number> {
		const task = await this.repository.findOneBy({ id: id });
		if (task) {
			task.status = newStatus;
			task.updatedAt = new Date();
			const { id: updatedId } = await this.repository.save(task);
			await this.closeConnection();
			return updatedId;
		}
		await this.closeConnection();
		return -1;
	}

	async deleteTask(id: number): Promise<number> {
		const removedTask = await this.repository.findOneBy({ id: id });
		if (removedTask) {
			await this.repository.remove(removedTask);
			await this.closeConnection();
			return id;
		}
		await this.closeConnection();
		return -1;
	}

	async showLists(status: string | null = null): Promise<Task[]> {
		if (status) {
			const tasks = await this.repository.findBy({ status: status });
			await this.closeConnection();
			return tasks;
		}
		const allTasks = await this.repository.find();
		await this.closeConnection();
		return allTasks;
	}
}
