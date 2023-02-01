import path from 'node:path';

import JSONdb from 'simple-json-db';

const DB_PATH = path.resolve(__dirname, '../downloads/leveldb');

export const getdb = () => new JSONdb(DB_PATH);
