import { developmentEnvironment } from './configuration.dev';
import { productionEnvironment } from './configuration.prod';

export default () => {
  // TODO replace with new cloud host
  return process.env.VERCEL_ENV === 'production'
    ? productionEnvironment
    : developmentEnvironment;
};
