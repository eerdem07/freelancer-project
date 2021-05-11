import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Category } from '../models/department';
import { subCategory } from '../models/subCategory';
import { subCategory2 } from '../models/subCategory2';
import { University } from '../models/university';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  key: any;

  private dbUsers = '/Users'
  private dbCategory = '/Category'
  private dbUniveristy = '/University'

  userRef!: AngularFireList<User>
  categoryRef!: AngularFireList<Category>
  universityRef!: AngularFireList<University>

  constructor(
    public db: AngularFireDatabase
  ) {
    this.userRef = db.list(this.dbUsers)
    this.categoryRef = db.list(this.dbCategory)
    this.universityRef = db.list(this.dbUniveristy)

  }

  get suankiKullanici() {
    return JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
  }

  simdikiKullaniciByKey() {
    return this.db.list("/Users", q => q.orderByChild("userID").equalTo(this.suankiKullanici.uid))
  }

  addAccount(user: User) {
    return this.userRef.push(user)
  }

  updateAccount(user: User) {
    return this.userRef.update(user.key, user)
  }

  listProfileByUserID(userID: string) {
    return this.db.list<User>("/Users", q => q.orderByChild("userID").equalTo(userID))
  }

  addCategory(category: Category) {
    // return this.categoryRef.push(category)
    return this.db.list<Category>('/Category').push(category)
  }

  addSubCategory(subCategory: subCategory, key: any) {
    return this.db.list<subCategory>("/Category/" + key).push(subCategory)
  }

  addSubCategory2(subCategory2: subCategory2, key1: any, key2: any) {
    return this.db.list<subCategory2>("/Category/" + key1 + "/" + key2).push(subCategory2)
  }

  listCategory() {
    return this.categoryRef
  }

  listUniversity() {
    return this.universityRef
  }

  listSubCategory(key: any) {
    // return this.db.list("/Category/" +key, q=> q.orderByKey().equalTo(key))
    return this.db.list<subCategory>("/Category/" + key)
  }

  listCategoryByName(name: string) {
    return this.db.list("/Category", q => q.orderByChild("name").equalTo(name))
  }

  listSubCategoryByName(name: string, key: any) {
    return this.db.list("/Category/" + key, q => q.orderByChild("name").equalTo(name))
  }

  listSubCategory2(key1: any, key2: any) {
    return this.db.list("/Category/" + key1 + "/" + key2)
  }

  addUniversty(university: University) {
    return this.universityRef.push(university)
  }

  test() {
    return this.db.list("Users", q => q.orderByChild("yetenekler").equalTo("Node.js") && q.orderByChild("bolum").equalTo("Web Developer"))
  }

  listProfileByCategoryPersonel(categoryName: any) {
    return this.db.list("/Users", q => q.orderByChild("bolum").equalTo(categoryName))
  }

  listProfileBySubCategoryPersonel(categoryName: any) {
    return this.db.list("/Users", q => q.orderByChild("altKategori").equalTo(categoryName))
  }

  listProfileBySubCategory2Personel(categoryName: any) {
    return this.db.list("/Users", q => q.orderByChild("yetenekler").equalTo(categoryName))
  }

  listProfileByCategoryEmployer(categoryName: any) {
    return this.db.list("/Users", q => q.orderByChild("bolum").equalTo(categoryName))
  }

  listProfileBySubCategoryEmployer(categoryName: any) {
    return this.db.list("/Users", q => q.orderByChild("altKategori").equalTo(categoryName))
  }

  listProfileBySubCategory2Employer(categoryName: any) {
    return this.db.list("/Users", q => q.orderByChild("yetenekler").equalTo(categoryName))
  }

  listProfile() {
    return this.db.list<User>("/Users", q => q.orderByChild("userID").limitToFirst(4))
  }
}
