import { Controller, Get, Request } from '@nestjs/common';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { TRequest } from 'src/types/request.type';
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
  getProfile(
    // TODO implement and use a User type (Dto + roles property)
    @Request()
    req: TRequest,
  ) {
    console.log(req.user);
    return req.user;
  }
}
