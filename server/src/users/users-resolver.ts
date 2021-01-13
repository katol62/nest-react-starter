import {Resolver, Query, Args, Mutation, InputType} from "@nestjs/graphql";
import {UsersService} from "../shared/services/users/users.service";
import {UserModel} from "../shared/models/user.model";
import {HttpException, HttpStatus, NotFoundException, UnauthorizedException, UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../shared/guards/gql-auth.guard";
import {CurrentUser} from "../shared/decorators/current-user.decorator";
import {UserDeleteResponse, UserFilter, UserLogin, UserLoginResponse, UserRegister, UserUpdateResponse} from "../shared/dto/user-dto";
import {DeleteResult} from "typeorm";

@Resolver((of) => UserModel)
export class UsersResolver {

	constructor(private readonly userService: UsersService) {}

	@Query((returns) => [UserModel])
	@UseGuards(GqlAuthGuard)
	async users(@Args() filter: UserFilter): Promise<UserModel[] | []> {
		console.log(`query users: ${JSON.stringify(filter.filter)}`);
		return await this.userService.findAll(filter.filter ? filter.filter : null)
	}

	@Query((returns) => UserModel, {name: 'user'})
	@UseGuards(GqlAuthGuard)
	async user(@Args() filter: UserFilter): Promise<UserModel | null> {
		console.log(`query user: ${JSON.stringify(filter.filter)}`);
		return await this.userService.findOne(filter.filter ? filter.filter : null)
	}

	@Mutation( returns => UserLoginResponse, {name: 'login'})
	async login(@Args() data: UserLogin): Promise<UserLoginResponse | null> {
		const user = await this.userService.findOne({phone: data.phone});
		if (!user) {
			throw new NotFoundException()
		} else {
			const match = data.password ? await user.comparePassword(data.password) : true;
			if (!match) {
				throw new HttpException(
					{ message: 'Password is incorrect' },
					HttpStatus.UNAUTHORIZED,
				);
			}
			const token = this.userService.createToken(user);
			let resp = new UserLoginResponse();
			resp.token = token;
			return resp;
		}
	}

	@Mutation(returns => UserModel, {name: 'register'})
	async register(@Args({type: ()=>UserRegister}) reg: UserRegister): Promise<UserModel | null> {
		let user: UserModel = new UserModel();
		for (let key in reg) {
			user[key] = reg[key];
		}
		try {
			let resUser = await this.userService.create(user)
			const token = this.userService.createToken(user);
			resUser.token = token;
			return resUser;
		} catch (err) {
			throw new HttpException(
				{ message: 'Error creating record', err },
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	@Mutation(returns => UserModel, {name: 'create'})
	async create(@Args({type: ()=>UserRegister}) reg: UserRegister): Promise<UserModel | null> {
		let user: UserModel = new UserModel();
		for (let key in reg) {
			user[key] = reg[key];
		}
		try {
			const created = await this.userService.create(user);
			return created;
		} catch (err) {
			throw new HttpException(
				{ message: 'Error creating record', err },
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	@Mutation(returns => UserDeleteResponse, {name: 'delete'})
	@UseGuards(GqlAuthGuard)
	async remove(@Args('id') id: number): Promise<UserDeleteResponse | null> {
		const result: DeleteResult = await this.userService.remove(+id);
		const resp: UserDeleteResponse = {success: (result.affected > 0)}
		return resp
	}

	@Mutation(returns => UserUpdateResponse, {name: 'update'})
	async update(@Args('id') id: number, @Args() data: UserRegister ): Promise<UserUpdateResponse| null> {
		let user: UserModel = new UserModel();
		for (let key in data) {
			user[key] = data[key];
		}
		try {
			const result = await this.userService.update(id, user);
			let response = new UserUpdateResponse();
			if (result.affected > 0) {
				const user = await this.userService.findOne({id: id});
				response.user = user;
				response.success = true;
				return response;
			} else {
				const errors = { username: 'No content.' };
				throw new HttpException(
					{ message: 'Error updating record', errors },
					HttpStatus.NO_CONTENT,
				);
			}
		} catch (err) {
			throw new HttpException(
				{ message: 'Error updating record', err },
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	@Query(returns => UserModel, {name: 'me'})
	@UseGuards(GqlAuthGuard)
	async me(@CurrentUser() user: UserModel): Promise<UserModel | null> {
		return await this.userService.findOne({id: user.id});
	}

}
