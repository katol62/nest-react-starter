import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt";
import {UsersService} from "../services/users/users.service";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	constructor(
		private readonly usersService: UsersService,
		private readonly configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET'),
		});
	}

	async validate(payload: any): Promise<any> {

		const exp = this.configService.get<number>('JWT_EXPIRES')
		console.log(payload);
		console.log(`exp: ${exp}`);
		const { phone } = payload
		const user = await this.usersService.validateUser(phone)
		if (!user) {
			throw new UnauthorizedException()
		}
		return user
	}
}
