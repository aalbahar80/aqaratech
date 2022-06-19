import { Controller, Get, Request } from '@nestjs/common';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { UserDto } from 'src/users/dto/user.dto';
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
    req: Request & { user: UserDto },
  ) {
    console.log(req.user);
    return req.user;
  }
}
