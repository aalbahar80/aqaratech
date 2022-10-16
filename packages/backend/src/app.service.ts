import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	async getMetrics() {
		// return this.prisma.$metrics.prometheus();
	}
}
