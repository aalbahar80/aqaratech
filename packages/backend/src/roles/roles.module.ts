import { Module } from '@nestjs/common';
import { PostmarkModule } from 'src/postmark/postmark.module';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
	controllers: [RolesController],
	providers: [RolesService],
	exports: [RolesService],
	imports: [PostmarkModule],
})
export class RolesModule {}
