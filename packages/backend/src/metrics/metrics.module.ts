import { Module } from '@nestjs/common';
import { HealthModule } from 'src/health/health.module';
import { PrometheusModule } from 'src/prometheus/prometheus.module';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';

@Module({
  providers: [MetricsService],
  controllers: [MetricsController],
  imports: [PrometheusModule, HealthModule],
})
export class MetricsModule {}
