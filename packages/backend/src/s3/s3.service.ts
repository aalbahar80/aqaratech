import {
	CreateBucketCommand,
	DeleteBucketCommand,
	DeleteObjectCommand,
	GetObjectCommand,
	GetObjectCommandInput,
	ListObjectsV2Command,
	ListObjectsV2CommandInput,
	PutObjectCommand,
	PutObjectCommandInput,
	S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, Logger } from '@nestjs/common';

import { S3_TTL_SECONDS } from 'src/constants/s3-ttl';
import { EnvService } from 'src/env/env.service';

@Injectable()
export class S3Service {
	constructor(private readonly env: EnvService) {
		const { R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = this.env.e;

		this._client = new S3Client({
			region: 'auto',
			endpoint: R2_ENDPOINT,
			credentials: {
				accessKeyId: R2_ACCESS_KEY_ID,
				secretAccessKey: R2_SECRET_ACCESS_KEY,
			},
		});
	}

	private readonly _client: S3Client;
	private readonly logger = new Logger(S3Service.name);

	async putObject(params: PutObjectCommandInput) {
		this.logger.debug(`Putting object in bucket ${params.Bucket ?? ''}`);
		const uploaded = await this._client.send(
			new PutObjectCommand({
				...params,
				ContentDisposition: 'inline',
			}),
		);
		return uploaded;
	}

	async listObjects(options: ListObjectsV2CommandInput) {
		this.logger.debug(`Listing objects in bucket ${options.Bucket ?? ''}`);

		const objects = await this._client.send(new ListObjectsV2Command(options));

		return objects;
	}

	async getObject(options: GetObjectCommandInput) {
		this.logger.debug(`Getting object in bucket ${options.Bucket ?? ''}`);
		const command = new GetObjectCommand(options);

		const url = await getSignedUrl(this._client, command, {
			expiresIn: S3_TTL_SECONDS,
		});
		this.logger.debug(
			`Returning signed url for Key: ${options.Key ?? ''}: - URL: ${url}`,
		);
		return url;
	}

	async removeObject(options: GetObjectCommandInput) {
		return await this._client.send(new DeleteObjectCommand(options));
	}

	async deleteBucket(bucketName: string) {
		// delete all objects in bucket
		const objects = await this.listObjects({
			Bucket: bucketName,
		});

		if (objects.Contents) {
			await Promise.all(
				objects.Contents.map((object) =>
					this.removeObject({
						Bucket: bucketName,
						Key: object.Key,
					}),
				),
			);
		}

		// delete bucket
		const deleted = await this._client.send(
			new DeleteBucketCommand({
				Bucket: bucketName,
			}),
		);

		return deleted;
	}

	async createBucket(bucketName: string) {
		return await this._client.send(
			new CreateBucketCommand({
				Bucket: bucketName,
			}),
		);
	}
}
