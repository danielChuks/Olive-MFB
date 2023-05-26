import { User } from '../data/user';

export interface LoginResponse {
  accountNumber: User;
  token: string;
}
