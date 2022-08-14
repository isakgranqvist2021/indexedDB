export interface User {
  id: number;
  createdAt: number;
  email: string;
}

export interface CreateUser extends Pick<User, 'email'> {}
