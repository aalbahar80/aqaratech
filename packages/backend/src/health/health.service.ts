import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { HealthIndicator } from 'src/health/interfaces/health-indicator.interface';
import { NestjsHealthIndicator } from 'src/health/models/nestjs-health.indicator';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';
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
    readonly configService: ConfigService<EnvironmentConfig>,
  ) {
    const url = configService.get('apiConfig.PUBLIC_API_URL', {
      infer: true,
    });

    if (!url) {
      throw new Error('[Health Service] PUBLIC_API_URL not found');
    }

    this.listOfThingsToMonitor = [
      new NestjsHealthIndicator(this.http, url, this.promClientService),
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
