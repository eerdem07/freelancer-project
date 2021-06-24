import { subJobCategory } from './subJobCategory';

export class JobCategory {
  key?: string;
  name!: string;
  subJobCategory?: subJobCategory[];
}
