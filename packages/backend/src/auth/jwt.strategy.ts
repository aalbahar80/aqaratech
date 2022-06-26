import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';
import { ValidatedUser } from 'src/types/user-validated.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService<EnvironmentConfig>) {
    const jwksUri = `${configService.get('authConfig.AUTH0_DOMAIN', {
      infer: true,
    })}/.well-known/jwks.json`;

    const audience = `${configService.get('authConfig.AUTH0_API_AUDIENCE', {
      infer: true,
    })}`;

    const issuer = `${configService.get('authConfig.AUTH0_DOMAIN', {
      infer: true,
    })}/`;

    super({
      // TODO: simplify configService vars
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // https://github.com/mikenicholson/passport-jwt#configure-strategy
      audience,
      issuer,
      algorithms: ['RS256'],
    });
  }

  /**
   * @param payload
   * access token as received from Auth0
   */
  validate(payload: any): ValidatedUser {
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

    // grab userStuff, which auth0 places in the access token on every login
    // TODO handle case where auth0 did not find user by email.
    const user = payload[
      `${apiNamespace}/userStuff`
    ] as unknown as ValidatedUser;
    return user;
  }
}
