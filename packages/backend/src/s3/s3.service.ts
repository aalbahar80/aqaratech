import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';

@Injectable()
export class S3Service extends S3Client {
  constructor(readonly configService: ConfigService<EnvironmentConfig>) {
    const accountId = configService.get('r2Config.R2_ACCOUNT_ID', {
      infer: true,
    });

    const accessKeyId = configService.get('r2Config.R2_ACCESS_KEY_ID', {
      infer: true,
    });

    const secretAccessKey = configService.get('r2Config.R2_SECRET_ACCESS_KEY', {
      infer: true,
    });

    // TODO use class validator?
    // https://docs.nestjs.com/techniques/configuration#configuration
    if (!accountId || !accessKeyId || !secretAccessKey) {
      throw new Error('R2 config not found');
    }

    super({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }
}
