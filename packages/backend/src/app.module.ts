import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// common
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import configuration from './config/configuration';

// resources
import { PortfoliosModule } from './portfolios/portfolios.module';
import { PrismaModule } from './prisma/prisma.module';
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
    // { provide: 'APP_GUARD', useClass: JwtAuthGuard }
  ],
})
export class AppModule {}
