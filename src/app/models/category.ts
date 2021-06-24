import { subCategory } from './subCategory';

export class Category {
  key?: string;
  name!: string;
  desc?: string;
  subCategory?: subCategory[];
}
