import { subJobCategory } from './../models/subJobCategory';
import { JobCategory } from './../models/jobCategory';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Category } from '../models/department';
import { Job } from '../models/job';
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
  private dbJobCategory = '/JobCategory'

  userRef!: AngularFireList<User>
  categoryRef!: AngularFireList<Category>
  universityRef!: AngularFireList<University>
  jobCategoryRef!: AngularFireList<Job>

  constructor(
    public db: AngularFireDatabase
  ) {
    this.userRef = db.list(this.dbUsers)
    this.categoryRef = db.list(this.dbCategory)
    this.universityRef = db.list(this.dbUniveristy)
    this.jobCategoryRef = db.list(this.dbJobCategory)

  }

  // User İşlemleri Başlangıç

  get suankiKullanici() {
    return JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
  }

  simdikiKullaniciByKey() {
    return this.db.list("/Users", q => q.orderByChild("userID").equalTo(this.suankiKullanici.uid))
  }

  async addAccount(user: User) {
    await this.userRef.push(user)
  }

  async updateAccount(user: User) {
    await this.userRef.update(user.key, user)
  }

  listProfileByUserID(userID: string) {
    return this.db.list<User>("/Users", q => q.orderByChild("userID").equalTo(userID))
  }

  // User İşlemleri End

  // Job İşlemleri Başlangıç

  async addJob(job:Job){
    await this.db.list('/Job').push(job)
  }

  async addJobCategory(JobCategory:JobCategory){
    await this.jobCategoryRef.push(JobCategory)
  }

  async addJobSubCategory(subJobCategory:subJobCategory, key:any){
    await this.db.list("/JobCategory/" + key).push(subJobCategory)
  }

  listjob(){
    return this.db.list<Job>("/Job").snapshotChanges().pipe(
      map((changes)=>{
        return changes.map(change=>{
          const job = { key:change.key, ...change.payload.val()!} as Job
          return job
        })
      })
    )
  }

  listJobByKey(key:string){
    return this.db.object<Job>("/Job/" + key).snapshotChanges().pipe(
      map((change)=>{
        const job:Job = { ...change.payload.val()!, key:change.key} as Job
        return job
      })
    )
  }

  listJobByUid(uid:any){
    return this.db.list("/Job",q=> q.orderByChild("uid").equalTo(uid))
  }

  // listJobByUid(uid:any){
  //   return this.db.list<Job>("/Job", q=> q.orderByChild(uid).equalTo(uid)).snapshotChanges().pipe(
  //     map((changes)=>{
  //       return changes.map(change=>{
  //         const jobs = { key:change.key, ...change.payload.val()!} as Job
  //         return jobs
  //       })
  //     })
  //   )
  // }

  listJobCategory(){
    return this.jobCategoryRef
  }

  listJobSubCategory(key:string){
    return this.db.list("/JobCategory/"+ key)
  }

  listJobCategoryByName(name:string){
    return this.db.list("JobCategory", q=> q.orderByChild("name").equalTo(name))
  }

  // Job İşlemleri Bitiş

  // Kategori İşlemleri Başlangıç

  async addCategory(category: Category) {
    await this.db.list<Category>('/Category').push(category)
  }

  async addSubCategory(subCategory: subCategory, key: any) {
    await this.db.list<subCategory>("/Category/" + key).push(subCategory)
  }

  async addSubCategory2(subCategory2: subCategory2, key1: any, key2: any) {
    await this.db.list<subCategory2>("/Category/" + key1 + "/" + key2).push(subCategory2)
  }

  listCategory() {
    return this.categoryRef
  }

  listUniversity() {
    return this.universityRef
  }

  listSubCategory(key: any) {
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

  // Kategori İşlemleri Bitiş

  async addUniversty(university: University) {
    await this.universityRef.push(university)
  }

  // List Profile By Category

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


  // End
  listProfile() {
    return this.db.list<User>("/Users", q => q.orderByChild("userID").limitToFirst(4))
  }
}
