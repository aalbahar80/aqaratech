import { NestApplicationOptions } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from 'src/app.module';
import { MyfatoorahService } from 'src/myfatoorah/myfatoorah.service';
import { createStubMyfatoorah } from 'src/myfatoorah/myfatoorah.stub';
import { PostmarkService } from 'src/postmark/postmark.service';
import { createStubPostmark } from 'src/postmark/postmark.stub';

export async function createTestApp(options: NestApplicationOptions) {
	console.log('Creating test app');

	const moduleRef = await Test.createTestingModule({
		imports: [AppModule],
	})
		.overrideProvider(MyfatoorahService)
		.useValue(createStubMyfatoorah())
		.overrideProvider(PostmarkService)
		.useValue(createStubPostmark())
		// .overrideProvider(S3Service)
		// .useValue(createStubS3())
		.compile();

	console.log('Test app is ready');

	const app = moduleRef.createNestApplication(options);

	return app;
}
