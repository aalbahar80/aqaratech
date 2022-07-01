import { Controller, Get } from '@nestjs/common';
import { HealthCheckResult } from '@nestjs/terminus';
import { Public } from 'src/auth/public.decorator';
import { HealthService } from 'src/health/health.service';

@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Public() // TODO prod remove
  @Get()
  public async check(): Promise<HealthCheckResult> {
    return await this.healthService.check();
  }
}
