import { developmentEnvironment } from './configuration.dev';
import { productionEnvironment } from './configuration.prod';

export default () => {
  return process.env.VERCEL_ENV === 'production'
    ? productionEnvironment()
    : developmentEnvironment();
};
