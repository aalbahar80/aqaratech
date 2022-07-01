import { Module } from '@nestjs/common';
import { PrometheusService } from 'src/prometheus/prometheus.service';

@Module({
  providers: [PrometheusService],
  exports: [PrometheusService],
})
export class PrometheusModule {}
