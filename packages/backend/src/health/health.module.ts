import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from 'src/health/health.controller';
import { HealthService } from 'src/health/health.service';
import { PrometheusModule } from 'src/prometheus/prometheus.module';

@Module({
  imports: [TerminusModule, PrometheusModule, HttpModule],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
