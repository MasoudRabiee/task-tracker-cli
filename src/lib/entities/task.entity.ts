import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../../utils/enums/status.enum";

@Entity()
export class Task {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column( {enum: Status})
	status: string;

	@Column()
	createdAt: Date;

	@Column()
	updatedAt: Date;
}
