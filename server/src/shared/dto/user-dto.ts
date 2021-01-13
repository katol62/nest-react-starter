import {ArgsType, Field, InputType, ObjectType, PartialType} from "@nestjs/graphql";
import {EUserRole, UserModel} from "../models/user.model";
import {type} from "os";

/**
 * Filter
 */
@InputType()
export class UserFilterDto {
	@Field({nullable: true})
	readonly id: number;

	@Field({nullable: true})
	readonly phone: string;

	@Field({nullable: true})
	readonly firstName?: string;

	@Field({nullable: true})
	readonly lastName?: string;

	@Field({nullable: true})
	readonly email?: string;

	@Field({nullable: true})
	readonly role: EUserRole;
}

@ArgsType()
export class UserFilter {
	@Field((type) => UserFilterDto, {nullable: true})
	filter?: UserFilterDto | null
}

/**
 * Login
 */
@ArgsType()
export class UserLogin {
	@Field()
	phone: string;
	@Field({nullable: true})
	password: string;
}

@ObjectType()
export class UserLoginResponse {
	@Field()
	token: string;
}

/**
 * Register
 */

@InputType('regData')
export class UserInput {
	@Field()
	phone: string;

	@Field({nullable: true})
	firstName: string;

	@Field({nullable: true})
	lastName: string;

	@Field({nullable: true})
	password: string;

	@Field({nullable: true})
	deviceId: string;

	@Field({nullable: true})
	verified: boolean;

	@Field({nullable: true})
	email: string;

	@Field({nullable: true})
	dob: Date;

	@Field({nullable: true})
	role: EUserRole = EUserRole.user;
}

@ArgsType()
export class UserRegister {
	@Field({nullable: true})
	phone: string;

	@Field({nullable: true})
	firstName: string;

	@Field({nullable: true})
	lastName: string;

	@Field({nullable: true})
	password: string;

	@Field({nullable: true})
	deviceId: string;

	@Field({nullable: true})
	verified: boolean;

	@Field({nullable: true})
	email: string;

	@Field({nullable: true})
	dob: Date;

	@Field({nullable: true})
	role: EUserRole = EUserRole.user;
}

/**
 * Delete
 */

@ObjectType()
export class UserDeleteResponse {
	@Field(type => Boolean)
	success: boolean;
}

/**
 * Update
 */

@ObjectType()
export class UserUpdateResponse {
	@Field(type => Boolean)
	success: boolean;

	@Field(type => UserModel, {nullable: true})
	user: UserModel
}


