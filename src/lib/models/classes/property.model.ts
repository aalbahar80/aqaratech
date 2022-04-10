import type { IProperty } from '$models/interfaces/property.interface';
import type { IDeserializable } from '$models/interfaces/deserializable.interface';
import { concatIfExists } from '$lib/utils/common';

export class PropertyModel implements IDeserializable<IProperty>, IProperty {
	static singular = 'property';
	static plural = 'properties';

	// factory that returns a new instance of this class for new form default values
	static defaultForm = (): PropertyModel =>
		new PropertyModel().deserialize({
			area: '',
			block: '',
			avenue: '',
			street: '',
			number: '',
			clientId: '',
		});

	public id?: string;
	public area?: string | null;
	public clientId?: string;
	public createdAt?: Date;
	public updatedAt?: Date;
	public block?: string | null;
	public avenue?: string | null;
	public street?: string | null;
	public number?: string | null;
	public long?: number | null;
	public lat?: number | null;

	public getLabel = () => this.area?.length;
	public getAddress = () => {
		return concatIfExists([this.area, 'ق', this.block, 'م', this.number]);
	};

	deserialize(input: IProperty): this {
		Object.assign(this, input);
		return this;
	}
}

const one = new PropertyModel().deserialize({
	// id: '123',
	area: 'abc',
});

one.area;
one.clientId;
