export enum Action {
	Manage = 'manage',
	Create = 'create',
	Read = 'read',
	/** Created to limit unauthorized-ability definition. */
	ReadOne = 'readOne',
	Update = 'update',
	Delete = 'delete',
}
