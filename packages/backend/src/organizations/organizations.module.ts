import { Module } from '@nestjs/common';
import { RolesModule } from 'src/roles/roles.module';
import { SearchModule } from 'src/search/search.module';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
  imports: [RolesModule, SearchModule],
})
export class OrganizationsModule {}
