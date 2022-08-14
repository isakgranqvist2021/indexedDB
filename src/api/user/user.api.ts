import { db, newTransaction } from '../../services/cache';
import { objectStoreName } from './user.constants';
import { CreateUser, User } from './user.types';

export const insertUser = (createUser: CreateUser): Promise<User | null> => {
  return new Promise(async (resolve, reject) => {
    const store = newTransaction(objectStoreName, 'readwrite');
    if (!db || !store) return;

    const query = store.add({ ...createUser, createdAt: Date.now() });
    query.onsuccess = (e) => {
      const user: User = {
        createdAt: Date.now(),
        email: createUser.email,
        id: (e.target as IDBRequest).result,
      };

      resolve(user);
    };
    query.onerror = () => reject(null);
  });
};

export const getUserById = (id: number): Promise<User | null> => {
  return new Promise(async (resolve, reject) => {
    const store = newTransaction(objectStoreName, 'readonly');
    if (!db || !store) return;

    const query = store.get(id);
    query.onsuccess = (e) => resolve((e.target as IDBRequest).result);
    query.onerror = () => reject(null);
  });
};

export const getAllUsers = (): Promise<User[] | null> => {
  return new Promise(async (resolve, reject) => {
    const store = newTransaction(objectStoreName, 'readonly');
    if (!db || !store) return;

    const query = store.getAll();
    query.onsuccess = (e) => resolve((e.target as IDBRequest).result);
    query.onerror = () => reject(null);
  });
};

export const deleteUserById = (id: number): Promise<string | null> => {
  return new Promise(async (resolve, reject) => {
    const store = newTransaction(objectStoreName, 'readwrite');
    if (!db || !store) return;

    const query = store.delete(id);
    query.onsuccess = () => resolve('OK');
    query.onerror = () => reject(null);
  });
};
