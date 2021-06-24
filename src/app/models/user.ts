import { subCategory } from './subCategory';
import { subCategory2 } from './subCategory2';

export class User {
  key!: string;
  userID!: string;
  password!: string;
  ad!: string;
  telNo!: string;
  soyad!: string;
  mail!: string;
  ozgecmis?: string;
  photoUrl?: string;
  university?: string;
  bolum?: string;
  altKategori?: string;
  yetenekler?: string;
  rol!: 'admin' | 'user';
  type?: string;
}
