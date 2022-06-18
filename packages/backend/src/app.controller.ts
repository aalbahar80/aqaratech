import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  // TODO register authguard globally
  // https://docs.nestjs.com/security/authentication#enable-authentication-globally
  getProfile(
    // TODO implement and use a User type (Dto + roles property)
    @Request()
    req: Request & { user: { sub: string } },
  ) {
    console.log(req.user);
    return req.user;
  }
}
