import { Module } from '@nestjs/common';
import { OrgService } from './org.service';
import { OrgController } from './org.controller';

@Module({
  controllers: [OrgController],
  providers: [OrgService]
})
export class OrgModule {}
