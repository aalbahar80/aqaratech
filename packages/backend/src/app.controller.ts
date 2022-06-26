import { Controller, Get, Request } from '@nestjs/common';
import { Request as ERequest } from 'express';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { ValidatedUser } from 'src/types/user-validated.type';
import { AppService } from './app.service';

@Controller()
@SwaggerAuth()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/profile')
  getProfile(@Request() req: ERequest & { user: ValidatedUser }) {
    console.log(req.user);
    return req.user;
  }
}
