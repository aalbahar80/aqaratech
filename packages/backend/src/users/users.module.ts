import { CacheModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from 'src/auth/jwt.strategy';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		CacheModule.register(),
	],
	controllers: [UsersController],
	providers: [UsersService, JwtStrategy],
	exports: [UsersService],
})
export class UsersModule {}
