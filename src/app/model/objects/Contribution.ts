import {Project} from './Project';
import {User} from './User';

export interface Contribution {
  id: number;
  project: Project;
  donor: User;
  amount: number;
  donatedAt: string;
}
