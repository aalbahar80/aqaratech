import { Injectable } from '@nestjs/common';
import { HealthService } from 'src/health/health.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrometheusService } from 'src/prometheus/prometheus.service';

@Injectable()
export class MetricsService {
  constructor(
    private promClientService: PrometheusService,
    private healthService: HealthService,
    private readonly prisma: PrismaService,
  ) {}

  public get metrics(): Promise<string> {
    this.healthService.check();
    return Promise.all([
      this.promClientService.metrics,
      this.prisma.$metrics.prometheus(),
    ]).then(([prometheus, prisma]) => prometheus + prisma);
  }
}
