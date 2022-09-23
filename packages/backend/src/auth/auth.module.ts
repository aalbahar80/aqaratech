import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [PassportModule.register({ defaultStrategy: 'jwt' }), UsersModule],
	providers: [JwtStrategy],
	// exports: [PassportModule],
})
export class AuthModule {}
