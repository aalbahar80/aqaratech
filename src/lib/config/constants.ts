export const endpointBase = (entity: string) => `/${entity}.json`;

export const endpointPatch = (entity: string, id: string) =>
	`/${entity}/${id}.json?_method=PATCH`;
