import { applyDecorators } from '@nestjs/common';

/**
 * Decorator for adding auth to a swagger document.
 */
export function SwaggerAuth() {
  return applyDecorators();
  // ApiSecurity('oauth-swagger'),
  // ApiOAuth2(['openid', 'profile', 'email'], 'oauth-swagger'),
}
