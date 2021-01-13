import { Module } from '@nestjs/common';
import {SharedModule} from "../shared/shared.module";
import {UsersResolver} from "./users-resolver";
import {UsersService} from "../shared/services/users/users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModel} from "../shared/models/user.model";
import {JwtStrategy} from "../shared/strategies/jwt.strategy";

@Module({
	imports: [
		TypeOrmModule.forFeature([UserModel]),
		SharedModule,
	],
	providers: [
		UsersResolver,
		UsersService,
		JwtStrategy
	]
})
export class UsersModule {}
