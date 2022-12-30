import { fromUrl } from '../entity/from-url';
import { isEntityUrlName } from '../entity/is-entity';

export const inferUrlRelation = (pathname: string) => {
	// the pathname should be `.../entity/id/files`
	const [urlName, id] = pathname.split('/').slice(-3, -1);

	if (urlName && isEntityUrlName(urlName) && id) {
		const entity = fromUrl(urlName).title;
		return { entity, id };
	} else {
		throw new Error(`Could not infer route from pathname: ${pathname}`);
	}
};
