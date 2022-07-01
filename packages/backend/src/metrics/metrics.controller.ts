import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/public.decorator';
import { MetricsService } from 'src/metrics/metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private metricsService: MetricsService) {}

  @Public() // TODO prod remove
  @Get()
  public metrics(): Promise<string> {
    return this.metricsService.metrics;
  }
}
