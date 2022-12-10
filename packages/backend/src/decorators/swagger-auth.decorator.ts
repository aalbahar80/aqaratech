import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';

import { Cookie } from '@self/utils';

/**
 * Decorator for adding auth to a swagger document.
 */
export function SwaggerAuth() {
	return applyDecorators(ApiCookieAuth(Cookie.accessToken));
}
