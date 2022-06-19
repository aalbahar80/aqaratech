import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export function OrgHeaders() {
  return applyDecorators(ApiHeader({ name: 'x-organization-id' }));
}
