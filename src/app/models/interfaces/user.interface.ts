export interface User {
  _id:      string;
  admin: number;
  email:    string;
  username:     string;
  isActive: boolean;
  roles:    string[];
  __v:      number;
}
