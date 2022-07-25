import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';
import { ValidatedUserDto } from 'src/users/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService<EnvironmentConfig>) {
    const domain = configService.get('authConfig.AUTH0_DOMAIN', {
      infer: true,
    });
    const audience = configService.get('authConfig.AUTH0_API_AUDIENCE', {
      infer: true,
    });
    if (!domain || !audience) {
      throw new Error(
        'authConfig.AUTH0_DOMAIN and authConfig.AUTH0_API_AUDIENCE must be set',
      );
    }

    const jwksUri = `${domain}/.well-known/jwks.json`;

    const cookieExtractor = function (req: Request) {
      let token = null;
      if (req && req.headers.cookie) {
        token = req.cookies['accessToken'];
      }
      return token;
    };
    super({
      // TODO: simplify configService vars
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri,
      }),
      // jwtFromRequest: cookieExtractor,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // https://github.com/mikenicholson/passport-jwt#configure-strategy
      audience,
      domain,
      algorithms: ['RS256'],
    });
  }

  /**
   * @param payload
   * access token as received from Auth0
   */
  validate(payload: any): ValidatedUserDto {
    // Auth0 will hit our /user/by-email endpoint on each login to get a UserDto.
    // It will then place that UserDto in the access token.
    // Here, we extract that UserDto and place it in the request object,
    // where it can be accessed by the @Request() decorator (

    /**
     * @example of getting user in a route handler:
     * @Get('/profile')
     * getProfile(
     *   @Request()
     *   req: TRequest,
     * ) {
     *   console.log(req.user);
     *   return req.user;
     * }
     */
    const apiNamespace = this.configService.get(
      'authConfig.AUTH0_API_NAMESPACE',
      { infer: true },
    );
    if (!apiNamespace) {
      throw new Error('authConfig.AUTH0_API_NAMESPACE must be set');
    }

    // grab userStuff, which auth0 places in the access token on every login
    // TODO handle case where auth0 did not find user by email.
    const user = payload[
      `${apiNamespace}/userStuff`
    ] as unknown as ValidatedUserDto;
    return user;
  }
}
