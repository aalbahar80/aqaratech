import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
	extends PrismaClient<Prisma.PrismaClientOptions, 'query'>
	implements OnModuleInit
{
	// Consider using built-in debug mode
	// Info: https://www.prisma.io/docs/concepts/components/prisma-client/debugging
	constructor() {
		super({
			log: ['info', 'warn', 'error'],
		});
	}

	async onModuleInit() {
		await this.$connect();
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async enableShutdownHooks(app: INestApplication) {
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		this.$on('beforeExit', async () => {
			await app.close();
		});
	}
}
