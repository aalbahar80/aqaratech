import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerClient } from 'postmark';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';

@Injectable()
export class PostmarkService extends ServerClient {
  constructor(readonly configService: ConfigService<EnvironmentConfig>) {
    const logger = new Logger(PostmarkService.name);
    const token = configService.get('mailConfig.POSTMARK_TOKEN', {
      infer: true,
    });

    if (!token) {
      logger.warn('Postmark token not found');
    }

    super(token!);
  }
}
