import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/profile')
  getProfile(
    // TODO implement and use a User type (Dto + roles property)
    @Request()
    req: Request & { user: { sub: string } },
  ) {
    console.log(req.user);
    return req.user;
  }
}
