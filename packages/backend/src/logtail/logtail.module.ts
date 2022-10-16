import { Module } from '@nestjs/common';
import { LogtailService } from './logtail.service';

@Module({
	providers: [LogtailService],
	exports: [LogtailService],
})
export class LogtailModule {}
