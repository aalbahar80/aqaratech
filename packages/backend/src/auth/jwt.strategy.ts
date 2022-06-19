import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
        jwksUri: `https://dev-eehvhdp2.eu.auth0.com/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      // https://github.com/mikenicholson/passport-jwt#configure-strategy
      // audience: authConfig.AUTH0_API_AUDIENCE,
      // issuer: `${authConfig.AUTH0_DOMAIN}/`,
      audience: 'letand.be/api',
      issuer: `https://dev-eehvhdp2.eu.auth0.com/`, // TODO ensure backslash
      algorithms: ['RS256'],
    });
  }

  validate(payload: any) {
    return payload['https://letand.be/appMetadata'][
      'userStuff'
    ] as unknown as UserDto;

    // TODO: prod
    // return payload[`${config.AUTH0_API_NAMESPACE}/appMetadata`][
    //   'userStuff'
    // ] as unknown as UserDto;
  }
}
