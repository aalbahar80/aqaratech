// import { HealthIndicatorResult } from '@nestjs/terminus';
// import { AnyOtherService } from '../../any-other-module/any-other.service';
// import { PrometheusService } from '../../prometheus/prometheus.service';
// import { HealthIndicator } from '../interfaces/health-indicator.interface';
// import { BaseHealthIndicator } from './base-health.indicator';

// export class AnyOtherHealthIndicator
//   extends BaseHealthIndicator
//   implements HealthIndicator
// {
//   public readonly name = 'AnyOtherCustomHealthIndicator';
//   protected readonly help = 'Status of ' + this.name;

//   constructor(
//     private service: AnyOtherService,
//     protected promClientService: PrometheusService,
//   ) {
//     super();
//     // this.registerMetrics();
//     this.registerGauges();
//   }

//   public async isHealthy(): Promise<HealthIndicatorResult> {
//     const isHealthy = this.service.isConnected;
//     this.updatePrometheusData(isHealthy);
//     return this.getStatus(this.name, isHealthy);
//   }
// }
