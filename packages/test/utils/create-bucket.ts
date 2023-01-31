import { CreateBucketCommand, S3Client } from '@aws-sdk/client-s3';

import type { AqaratechEnv } from '@self/utils';

type R2EnvSchema = Pick<
	AqaratechEnv,
	'R2_ENDPOINT' | 'R2_ACCESS_KEY_ID' | 'R2_SECRET_ACCESS_KEY'
>;

export const createBucketDev = async (bucketName: string, env: R2EnvSchema) => {
	const client = new S3Client({
		region: 'auto',
		endpoint: env.R2_ENDPOINT,
		credentials: {
			accessKeyId: env.R2_ACCESS_KEY_ID,
			secretAccessKey: env.R2_SECRET_ACCESS_KEY,
		},
	});

	await client.send(
		new CreateBucketCommand({
			Bucket: bucketName,
		}),
	);
};
