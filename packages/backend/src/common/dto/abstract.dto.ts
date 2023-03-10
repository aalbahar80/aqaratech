import { ApiProperty, PickType } from '@nestjs/swagger';

export class AbstractDto {
	@ApiProperty({ readOnly: true })
	id: string;

	createdAt: Date;

	updatedAt: Date;
}

export class CreatedDto extends PickType(AbstractDto, ['id']) {
	constructor(data: CreatedDto) {
		super();
		Object.assign(this, data);
	}
}

export class UpdatedDto extends PickType(AbstractDto, ['id']) {
	constructor(data: UpdatedDto) {
		super();
		Object.assign(this, data);
	}
}

export class DeletedDto extends PickType(AbstractDto, ['id']) {
	constructor(data: DeletedDto) {
		super();
		Object.assign(this, data);
	}
}
