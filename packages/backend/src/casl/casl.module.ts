import { Global, Module } from '@nestjs/common';
import { TenantAbility } from 'src/casl/abilities/tenant-ability';
import { CaslAbilityFactory } from './casl-ability.factory';

@Global()
@Module({
  providers: [CaslAbilityFactory, TenantAbility],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
