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
  getProfile(@Request() req: any): string {
    console.log(req.user);
    return req.user;
  }
}
