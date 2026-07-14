import {Project} from './Project';
import {PagedResponse} from './PagedResponse';
import {Contribution} from './Contribution';

export interface ProjectDetailsPagedDTO {
  project: Project;
  contributions: PagedResponse<Contribution>;
}
