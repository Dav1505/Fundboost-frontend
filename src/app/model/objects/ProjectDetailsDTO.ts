import {Project} from './Project';
import {Contribution} from './Contribution';

export interface ProjectDetailsDTO{
  project: Project;
  contributions: Contribution[];
}
