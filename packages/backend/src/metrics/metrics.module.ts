import { Module } from '@nestjs/common';
import { HealthModule } from 'src/health/health.module';
import { MetricsController } from 'src/metrics/metrics.controller';
import { MetricsService } from 'src/metrics/metrics.service';
import { PrometheusModule } from 'src/prometheus/prometheus.module';

@Module({
  providers: [MetricsService],
  controllers: [MetricsController],
  imports: [PrometheusModule, HealthModule],
})
export class MetricsModule {}
