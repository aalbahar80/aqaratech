import { ApiProperty } from '@nestjs/swagger';

// TODO rename to meta
export class HateoasDto {
  href: string;
  mediaType?: string;
}
