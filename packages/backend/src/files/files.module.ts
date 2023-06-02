import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { S3Service } from 'src/s3/s3.service';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
	controllers: [FilesController],
	providers: [FilesService, S3Service],
	imports: [CacheModule.register()],
	exports: [S3Service],
})
export class FilesModule {}
