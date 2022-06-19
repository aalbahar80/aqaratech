import { ApiOAuth2 } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

/**
 * Decorator for adding auth to a swagger document.
 */
export function SwaggerAuth() {
  return applyDecorators(
    ApiOAuth2(['openid', 'profile', 'email'], 'oauth-swagger'),
  );
}
