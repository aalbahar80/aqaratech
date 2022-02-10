export const endpointBase = (entity: string) => `/${entity}.json`;

export const endpointId = (entity: string, id: string) =>
	`/${entity}/${id}.json`;

export const endpointPatch = (entity: string, id: string) =>
	`/${entity}/${id}.json?_method=PATCH`;

export const endpointDelete = (entity: string, id: string) =>
	`/${entity}/${id}.json?_method=DELETE`;

export const editPageHref = (entity: string, id: string) =>
	`/${entity}/${id}/edit`;
