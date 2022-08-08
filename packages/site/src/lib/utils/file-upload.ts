import {
	S3Client,
	ListBucketsCommand,
	ListObjectsV2Command,
	GetObjectCommand,
	PutObjectCommand,
} from '@aws-sdk/client-s3';
import {
	PUBLIC_R2_ACCESS_KEY_ID,
	PUBLIC_R2_ACCOUNT_ID,
	PUBLIC_R2_SECRET_ACCESS_KEY,
} from '$env/static/public';

// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const S3 = new S3Client({
	region: 'auto',
	endpoint: `https://${PUBLIC_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: PUBLIC_R2_ACCESS_KEY_ID,
		secretAccessKey: PUBLIC_R2_SECRET_ACCESS_KEY,
	},
});

export const fileUpload = async (file: File) => {
	const { Key } = await S3.send(
		new PutObjectCommand({ Bucket: 'bucket-test-1', Body: file }),
	);
	return Key;
};

export const fileDownload = async (key: string) => {
	const { Body } = await S3.send(
		new GetObjectCommand({ Bucket: 'bucket-test-1', Key }),
	);
	return Body;
};

export const fileDelete = async (key: string) => {
	await S3.send(new DeleteObjectCommand({ Bucket: 'bucket-test-1', Key }));
};

export const fileDownloadUrl = async (key: string) => {
	const { url } = await S3.send(
		new GetObjectCommand({ Bucket: 'bucket-test-1', Key: key }),
	);
	return url;
};

export const listFiles = async () => {
	console.log(await S3.send(new ListBucketsCommand('')));

	// console.log(
	// 	await S3.send(new ListObjectsV2Command({ Bucket: 'bucket-test-1' })),
	// );

	// const { Contents } = await S3.send(
	// 	new ListObjectsV2Command({ Bucket: 'bucket-test-1' }),
	// );
	// return Contents;
};
