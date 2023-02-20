import { ListObjectsV2Output } from '@aws-sdk/client-s3';
import sinon from 'sinon';

import { S3Service } from './s3.service';

export function createStubS3() {
	const s3 = sinon.createStubInstance(S3Service, {
		// createBucket: sinon.stu
		// stub createBucket which takes a string and returns a promise
		// @ts-expect-error stub
		createBucket: sinon.stub().resolves(),

		// stub deleteBucket which takes a string and returns the same string as a promise
		// log the string to the console
		// @ts-expect-error stub
		deleteBucket: sinon.stub().callsFake((bucketName: string) => {
			console.log(bucketName);
			console.log('deleteBucket called');
			return Promise.resolve(bucketName);
		}),

		// @ts-expect-error stub
		listObjects: sinon.stub().resolves({
			Contents: [
				{
					Key: 'portfolio',
				},
			] satisfies ListObjectsV2Output['Contents'],
		}),
	});

	return s3;
}
