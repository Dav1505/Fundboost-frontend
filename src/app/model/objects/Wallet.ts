import {User} from './User';

export interface Wallet{
  id: number;
  user: User;
  balance: number;
  version: number;
}
