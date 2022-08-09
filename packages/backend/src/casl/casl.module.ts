import { Global, Module } from '@nestjs/common';
import { PortfolioAbility } from 'src/casl/abilities/portfolio-ability';
import { TenantAbility } from 'src/casl/abilities/tenant-ability';
import { CaslAbilityFactory } from './casl-ability.factory';

@Global()
@Module({
  providers: [CaslAbilityFactory, PortfolioAbility, TenantAbility],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
