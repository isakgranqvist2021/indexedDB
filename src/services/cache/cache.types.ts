export type ObjectStoreName = 'users';

export interface ObjectStoreConfig {
  name: ObjectStoreName;
  options?: IDBObjectStoreParameters;
}
