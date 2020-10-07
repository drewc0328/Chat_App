export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  rooms: [{ name: string; id: string }];
}

export default User;
