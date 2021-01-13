import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, FindManyOptions, FindOneOptions, Repository, UpdateResult} from "typeorm";
import {UserModel} from "../../models/user.model";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserModel)
		private readonly usersRepository: Repository<UserModel>,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async create(user: UserModel): Promise<UserModel> {
		const existingRecord = await this.usersRepository.findOne({
			where: [{ phone: user.phone }],
		});
		if (existingRecord) {
			const errors = { username: 'Phone already registered.' };
			throw new HttpException(
				{ message: 'Input data validation failed', errors },
				HttpStatus.BAD_REQUEST,
			);
		}
		await user.hashPassword();
		return await this.usersRepository.save({ ...user });
	}

	async findAll(filter?: any): Promise<UserModel[]> {
		const options: FindManyOptions = filter ? { where: [filter] } : {};
		const users = await this.usersRepository.find(options);
		return users;
	}

	async findOne(filter: any): Promise<UserModel> {
		const options: FindOneOptions = filter ? { where: [filter] } : {};
		const user = await this.usersRepository.findOne(options);
		return user;
	}

	async update(id: number, updatedData: UserModel): Promise<UpdateResult> {
		const existingRecord = await this.usersRepository.findOne({
			where: [{ id: id }],
		});
		if (!existingRecord) {
			const errors = { description: 'No record found.' };
			throw new HttpException(
				{ message: 'Not found', errors },
				HttpStatus.NOT_FOUND,
			);
		}
		return await this.usersRepository.update(id, updatedData);
	}

	async remove(id: number): Promise<DeleteResult> {
		const existingRecord = await this.usersRepository.findOne({
			where: [{ id: id }],
		});
		if (!existingRecord) {
			const errors = { description: 'No record found.' };
			throw new HttpException(
				{ message: 'Not found', errors },
				HttpStatus.NOT_FOUND,
			);
		}
		return this.usersRepository.delete(id);
	}

	createToken(user: UserModel): string {
		const payload = {
			id: user.id,
			phone: user.phone,
			role: user.role
		}
		const token = this.jwtService.sign(
			payload,
			{
				secret: this.configService.get('JWT_SECRET'),
			})
		return token;
	}

	async validateUser(phone: string, password?: string): Promise<UserModel | null> {
		const user = await this.usersRepository.findOne({where: [{phone: phone}]});
		if (user) {
			let correctPassword = true;
			if (password) {
				correctPassword = await user.comparePassword(password);
			}
			if (correctPassword) {
				const {password, ...result} = user;
				return user;
			}
		}
		return null;
	}


}
