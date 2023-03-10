export interface ITitle {
	title: string;
}

export interface IOrganizationId {
	organizationId: string;
}

export type NonComputed<T> = Omit<T, 'breadcrumbs'>;
