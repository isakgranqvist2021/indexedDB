import { objectStoreNames } from './cache.constants';
import { ObjectStoreName } from './cache.types';

export let db: IDBDatabase | null = null;

const createObjectStores = (db: IDBDatabase) => {
  objectStoreNames.forEach((objectStoreOptions) => {
    const { name, options } = objectStoreOptions;

    if (!db.objectStoreNames.contains(name)) {
      db.createObjectStore(name, options);
      return;
    }
  });
};

export const openDatabase = (database: string) => {
  if (!('indexedDB' in window)) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  const request = indexedDB.open(database, 2);

  request.onerror = (e) => {
    console.error((e.target as IDBOpenDBRequest).error);
    db = null;
  };

  request.onsuccess = (e) => {
    const target = e.target as IDBOpenDBRequest;

    createObjectStores(target.result);
    db = target.result;
  };

  request.onupgradeneeded = (e) => {
    const target = e.target as IDBOpenDBRequest;

    createObjectStores(target.result);
    db = target.result;
  };
};

export const newTransaction = (
  objectStoreName: ObjectStoreName,
  mode: IDBTransactionMode,
) => {
  if (!db) return null;

  const transaction = db.transaction(objectStoreName, mode);
  return transaction.objectStore(objectStoreName);
};
