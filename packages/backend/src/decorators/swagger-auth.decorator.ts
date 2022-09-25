import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

/**
 * Decorator for adding auth to a swagger document.
 */
export function SwaggerAuth() {
	return applyDecorators(ApiBearerAuth());
	// ApiSecurity('oauth-swagger'),
	// ApiOAuth2(['openid', 'profile', 'email'], 'oauth-swagger'),
}
