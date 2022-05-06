import path from 'path';
import { config as baseConfig } from '../config.js';

const config = {
	...baseConfig,
	storageState: path.resolve(__dirname, '../adminState.json'),
};

export default config;
