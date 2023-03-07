import { CacheModule, Module } from '@nestjs/common';

import { S3Module } from 'src/s3/s3.module';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
	controllers: [FilesController],
	providers: [FilesService],
	imports: [CacheModule.register(), S3Module],
})
export class FilesModule {}
