import { Repository } from "typeorm";
import { Status } from "../../utils/enums/status.enum";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/task.entity";

export class TaskRepository {
	private readonly repository: Repository<Task>;
	constructor() {
		this.repository = AppDataSource.getRepository(Task);
	}

	async createTask(task: Omit<Task, "id">) {
		const newTask = this.repository.create(task);
        const {id} = await this.repository.save(newTask)
        return id
	}

    async updateTask(id: number, newName: string) {
        const task = await this.repository.findOneBy({id: id})
        if (task) {
            task.name = newName
            const { id:updatedId } = await this.repository.save(task)
            return updatedId
        }
        return -1
    }

    async changeStatus(id: number, newStatus: string) {
        const task = await this.repository.findOneBy({id: id})
        if (task) {
            task.status = newStatus
            const {id: updatedId} = await this.repository.save(task)
            return updatedId
        }
        return -1
    }

    async deleteTask(id: number) {
        const removedTask = await this.repository.findOneBy({id:id})
        if (removedTask) {
            const {id: deleteTask} = await this.repository.remove(removedTask)
            return deleteTask
        }
        return -1
    }

    async showLists(status: string | null) {
        if (status) {
            return await this.repository.findBy({status: status})
        }
        return await this.repository.find()
    }
}
