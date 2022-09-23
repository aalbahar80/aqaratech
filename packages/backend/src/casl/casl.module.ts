import { Global, Module } from '@nestjs/common';
import { OrgAdminAbility } from 'src/casl/abilities/org-admin-ability';
import { PortfolioAbility } from 'src/casl/abilities/portfolio-ability';
import { TenantAbility } from 'src/casl/abilities/tenant-ability';
import { CaslAbilityFactory } from './casl-ability.factory';

@Global()
@Module({
	providers: [
		CaslAbilityFactory,
		OrgAdminAbility,
		PortfolioAbility,
		TenantAbility,
	],
	exports: [CaslAbilityFactory],
})
export class CaslModule {}
