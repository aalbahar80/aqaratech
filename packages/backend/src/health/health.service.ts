import { Injectable, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { HealthIndicator } from 'src/health/interfaces/health-indicator.interface';
import { NestjsHealthIndicator } from 'src/health/models/nestjs-health.indicator';
import { PrometheusService } from 'src/prometheus/prometheus.service';
// import { AnyOtherService } from '../any-other-module/any-other.service';
// import { AnyOtherHealthIndicator } from './models/any-other-health.indicator';

@Injectable()
export class HealthService {
  private readonly listOfThingsToMonitor: HealthIndicator[];

  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private promClientService: PrometheusService, // private anyOtherService: AnyOtherService,
  ) {
    this.listOfThingsToMonitor = [
      new NestjsHealthIndicator(
        this.http,
        process.env.NODE_ENV === 'production'
          ? 'https://nestjs-dev.onrender.com' // TODO use render's env var
          : 'http://localhost:3002',
        this.promClientService,
      ),
      // new AnyOtherHealthIndicator(this.anyOtherService, this.promClientService),
      // add site check?
    ];
  }

  @HealthCheck()
  public async check(): Promise<HealthCheckResult> {
    return await this.health.check(
      this.listOfThingsToMonitor.map(
        (apiIndicator: HealthIndicator) => async () => {
          try {
            return await apiIndicator.isHealthy();
          } catch (e) {
            Logger.warn(e);
            return apiIndicator.reportUnhealthy();
          }
        },
      ),
    );
  }
}
