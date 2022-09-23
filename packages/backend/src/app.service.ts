import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppService {
	constructor(private readonly prisma: PrismaService) {}

	getHello(): string {
		return 'Hello World!';
	}

	async getMetrics() {
		// return this.prisma.$metrics.prometheus();
	}
}
