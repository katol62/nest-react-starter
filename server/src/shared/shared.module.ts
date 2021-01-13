import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserModel} from "./models/user.model";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
	imports: [
		PassportModule,
		TypeOrmModule.forFeature([UserModel]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: {
					expiresIn: `${configService.get<number>('JWT_EXPIRES')}s`
				}
			}),
			inject: [ConfigService]
		})

	],
	providers: [UsersService, ConfigService, JwtStrategy],
	exports: [UsersService, JwtModule, JwtStrategy]
})
export class SharedModule {}
