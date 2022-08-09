import {
  DeleteObjectCommand,
  GetObjectCommand,
  GetObjectCommandInput,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  NoSuchBucket,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';

@Injectable()
export class S3Service {
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

    this._client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  private _client: S3Client;
  private readonly logger = new Logger(S3Service.name);

  async putObject(params: PutObjectCommandInput) {
    const uploaded = await this._client.send(
      new PutObjectCommand({
        ...params,
        ContentDisposition: 'inline',
      }),
    );
    return uploaded;
  }

  async listObjects(options: ListObjectsV2CommandInput) {
    try {
      const objects = await this._client.send(
        new ListObjectsV2Command(options),
      );
      return objects;
    } catch (error) {
      if (error instanceof NoSuchBucket) {
        this.logger.debug(`No bucket found: ${options.Bucket}`);
        return undefined;
      } else {
        this.logger.error(error);
        throw error;
      }
    }
  }

  async getObject(options: GetObjectCommandInput) {
    const command = new GetObjectCommand(options);

    const url = await getSignedUrl(this._client, command, { expiresIn: 3600 });
    return url;
  }

  async removeObject(options: GetObjectCommandInput) {
    return this._client.send(new DeleteObjectCommand(options));
  }
}
