import React, { useEffect, useRef, useState } from 'react';

import { User, deleteUserById, getAllUsers, insertUser } from './api/user';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  const getUsers = async () => {
    const res = await getAllUsers();

    if (res) {
      setUsers(res);
    }
  };

  const addUser = async () => {
    const email = ref.current?.value;
    if (!email) return;

    const res = await insertUser({ email });

    if (res !== null) {
      setUsers((prevState) => [...prevState, res]);
    }
    ref.current.value = '';
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <React.Fragment>
      <input ref={ref} />
      <button onClick={addUser}>Add to indexedDB</button>

      <ul>
        {users.map((user, i) => {
          const deleteUser = async () => {
            const res = await deleteUserById(user.id);
            if (!res) return;

            const newState = [...users];
            newState.splice(i, 1);
            setUsers(newState);
          };

          return (
            <li
              key={user.id}
              style={{ display: 'flex', gap: 10, alignItems: 'center' }}
            >
              <p>{user.id}</p>
              <p>{user.email}</p>
              <p>{new Date(user.createdAt).toLocaleString()}</p>
              <button onClick={deleteUser}>delete</button>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};
