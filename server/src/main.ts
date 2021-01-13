import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// app.setGlobalPrefix('api');
	app.enableCors();
	const config: ConfigService = app.get(ConfigService);
	const port: number = config.get<number>('SERVER_PORT') || 3000;
	await app.listen(port);
	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
