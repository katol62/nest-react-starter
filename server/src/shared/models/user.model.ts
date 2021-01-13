import {Field, ObjectType} from "@nestjs/graphql";
import {BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import * as bcrypt from "bcryptjs";

export enum EUserRole {
	super = 'super',
	admin = 'admin',
	user = 'user',
}

@ObjectType()
@Entity({ name: 'users' })
export class UserModel extends BaseEntity{

	@Field({nullable: true})
	@PrimaryGeneratedColumn()
	id: number;

	@Field({nullable: true})
	@Column({nullable: true})
	firstName: string;

	@Field({nullable: true})
	@Column({nullable: true})
	lastName: string;

	@Field({nullable: true})
	@Column({nullable: true})
	phone: string;

	@Field({nullable: true})
	@Column({nullable: true})
	deviceId: string;

	@Field({nullable: true})
	@Column()
	verified: boolean;

	@Field({nullable: true})
	@Column({nullable: true})
	email: string;

	@Field({nullable: true})
	@Column({nullable: true})
	dob: Date;

	@Field({nullable: true})
	@Column({nullable: true})
	password: string;

	@Field({nullable: true})
	@Column()
	role: EUserRole = EUserRole.user;

	@Field({nullable: true})
	token: string;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 5);
	}

	async comparePassword(attempt: string): Promise<boolean> {
		return await bcrypt.compare(attempt, this.password);
	}

}
