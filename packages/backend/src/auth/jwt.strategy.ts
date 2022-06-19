import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService<EnvironmentConfig>) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-eehvhdp2.eu.auth0.com/.well-known/jwks.json`,
        // jwksUri: `${this.configService.get('authConfig.AUTH0_DOMAIN', {
        //   infer: true,
        // })}.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // https://github.com/mikenicholson/passport-jwt#configure-strategy
      // issuer: `${this.configService.get('authConfig.AUTH0_API_AUDIENCE', {
      //   infer: true,
      // })}/`,
      // issuer: `${this.configService.get('authConfig.AUTH0_DOMAIN', {
      //   infer: true,
      // })}/`,
      audience: 'letand.be/api',
      issuer: `https://dev-eehvhdp2.eu.auth0.com/`, // TODO ensure backslash
      algorithms: ['RS256'],
    });
  }

  /**
   * @param payload
   * access token as received from Auth0
   */
  validate(payload: any) {
    // Auth0 will hit our /user/by-email endpoint on each login to get a UserDto.
    // It will then place that UserDto in the access token.
    // Here, we extract that UserDto and place it in the request object,
    // where it can be accessed by the @Request() decorator (

    /**
     * @example of getting user in a route handler:
     * @Get('/profile')
     * getProfile(
     *   @Request()
     *   req: Request & { user: UserDto },
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
    const user = payload[`${apiNamespace}/appMetadata`][
      'userStuff'
    ] as unknown as UserDto;
    return user;
  }
}
