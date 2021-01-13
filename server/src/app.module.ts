import { Module } from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import {join} from 'path';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import {Connection} from "typeorm";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserModel} from "./shared/models/user.model";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      GraphQLModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
              autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
              sortSchema: true,
              context: ({req}) => ({...req}),
              debug: true,
              playground: true
          }),
          inject: [ConfigService],
      }),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
              type: 'mysql',
              host: configService.get('DB_HOST'),
              port: +configService.get<number>('DB_PORT') | 3306,
              username: configService.get('DB_USER'),
              password: configService.get('DB_PASSWORD'),
              database: configService.get('DB_NAME'),
              autoLoadEntities: true,
              entities: [UserModel],
              synchronize: true,
          }),
          inject: [ConfigService],
      }),
      SharedModule,
      UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
    constructor(private connection: Connection) {}
}
