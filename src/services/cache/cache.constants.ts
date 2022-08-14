import { ObjectStoreConfig } from './cache.types';

export const objectStoreNames: ObjectStoreConfig[] = [
  {
    name: 'users',
    options: { keyPath: 'id', autoIncrement: true },
  },
];
