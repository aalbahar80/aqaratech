import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// common
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AbilitiesGuard } from 'src/casl/abilities.guard';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';

// resources
import { PortfoliosModule } from './portfolios/portfolios.module';
import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    PrismaModule,
    TenantsModule,
    PortfoliosModule,
    CaslModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'APP_GUARD', useClass: JwtAuthGuard }, // parses JWT and sets user in request
    { provide: APP_GUARD, useClass: AbilitiesGuard },
  ],
})
export class AppModule {}
