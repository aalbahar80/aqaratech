import {
	entitiesMap,
	fromUrl,
	isEntityUrlName,
	type Entity,
} from '@self/utils';

type Predefined = Map<string, any> | false | undefined;

export const create = ({
	entity,
	predefined,
}: {
	entity: Entity;
	predefined?: Predefined;
}) => {
	const formBaseUrl = `/${entitiesMap[entity].urlName}/new`;

	if (predefined) {
		return `${formBaseUrl}?${new URLSearchParams([...predefined])}`;
	} else {
		return formBaseUrl;
	}
};

export const settings = (orgId: string) => ({
	organization: `/organizations/${orgId}/settings/organization`,
	tree: `/organizations/${orgId}/settings/expense-tree`,
});

export const inferRoute = (pathname: string) => {
	const [, urlName, id] = pathname.split('/');

	if (urlName && isEntityUrlName(urlName) && id) {
		const entity = fromUrl(urlName);
		return { entity, id };
	} else {
		throw new Error(`Could not infer route from pathname: ${pathname}`);
	}
};

type RouteArgs =
	| { organizationId: string; portfolioId: string }
	| { params: Record<string, string> };

type Output =
	| {
			page: 'id' | 'edit' | string;
			entity: Entity;
			id: string;
	  }
	| {
			page: 'new';
			entity: Entity;
	  };

export const portfolioRoute = (routeArgs: RouteArgs): string => {
	let organizationId: string;
	let portfolioId: string;
	if ('organizationId' in routeArgs) {
		organizationId = routeArgs.organizationId;
		portfolioId = routeArgs.portfolioId;
	} else {
		organizationId = routeArgs.params.organizationId!;
		portfolioId = routeArgs.params.portfolioId!;
	}
	return `/organizations/${organizationId}/portfolios/${portfolioId}`;
};

export const getRoute = (routeArgs: RouteArgs, output: Output) => {
	const portfolio = portfolioRoute(routeArgs);

	const base = `${portfolio}/${entitiesMap[output.entity].urlName}`;

	if (output.page === 'new') {
		return base + `/new`;
	} else if (output.page === 'id') {
		return base + `/${output.id}`;
	} else if (output.page === 'edit') {
		return base + `/${output.id}`;
	} else {
		return base + `/${output.id}/${output.page}`;
	}
};
