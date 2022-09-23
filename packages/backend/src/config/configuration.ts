import { developmentEnvironment } from './configuration.dev';
import { productionEnvironment } from './configuration.prod';

export default () => {
	return process.env.PUBLIC_AQARATECH_ENV === 'production'
		? productionEnvironment()
		: developmentEnvironment();
};
