import {User} from './User';
import {ProjectStatus} from './ProjectStatus';

export interface Project {
  id: number;
  description: string;
  targetAmount: number;
  currentAmount: number;
  projectStatus: ProjectStatus;
  createdAt: string;
  deadline: string;
  creator?: User;
  version: number;
}
