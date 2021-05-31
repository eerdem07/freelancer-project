import { subJobCategory } from './../../../models/subJobCategory';
import { JobCategory } from './../../../models/jobCategory';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/department';
import { Job } from 'src/app/models/job';
import { subCategory } from 'src/app/models/subCategory';
import { subCategory2 } from 'src/app/models/subCategory2';
import { University } from 'src/app/models/university';
import { User } from 'src/app/models/user';
import { RealtimeService } from 'src/app/services/realtime.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  categories: Category[] = []
  category: Category = new Category()

  subCategories: subCategory[] = []
  subCategory: subCategory = new subCategory()

  subCategory2: subCategory2 = new subCategory2()

  key: Category = new Category()
  key2: subCategory = new subCategory()

  profil!: User

  university:University= new University()

  jobCategory:JobCategory = new JobCategory()
  jobCategories:Job[] = []

  subjobCategory:JobCategory = new JobCategory()

  constructor(
    public realtime: RealtimeService,
    public route: ActivatedRoute,
    public router: Router)  { }

  ngOnInit(): void {
    this.listJobCategory()
    this.listCategory()
    this.listByProfile()
  }

  addJobCategory(name:string){
    this.jobCategory.name = name
    this.realtime.addJobCategory(this.jobCategory)
  }

  addJobSubCategory(name:string){
    this.subjobCategory.name = name
    this.realtime.addJobSubCategory(this.subjobCategory,this.jobCategory.key)
  }

  listJobCategory(){
    this.realtime.listJobCategory().snapshotChanges().subscribe(datas=>{
      datas.forEach(data=>{
        const jobCategory = {...data.payload.toJSON(), key:data.key}
        this.jobCategories.push(jobCategory as JobCategory)
        console.log(this.jobCategories)
      })
    })
  }

  selectedListKey4(event:any){
    this.realtime.listJobCategoryByName(event.value).snapshotChanges().subscribe(datas=>{
      datas.forEach(data=>{
        const jobCategory = { ...data.payload.toJSON(), key:data.key}
        this.jobCategory = (jobCategory as JobCategory)
      })
    })
  }

  listByProfile() {
    this.realtime.listProfileByUserID(this.realtime.suankiKullanici.uid).snapshotChanges().subscribe(profiller => {
      profiller.forEach(profil => {
        const q = { ...profil.payload.val(), key: profil.key }
        this.profil = (q as User)
        if(this.profil.rol=="user"){
          this.router.navigate(['/'])
        }
      })
    })
  }

  addUniversity(name:any){
    this.university.name = name
    this.realtime.addUniversty(this.university)
  }

  addCategory(name:any){
    this.category.name = name
    this.realtime.addCategory(this.category)
  }

  addSubCategory(name:any){
    this.subCategory.name = name
    this.realtime.addSubCategory(this.subCategory,this.key.key)
    this.categories = []
  }

  addSubCategory2(name:any){
    this.subCategory2.name = name
    this.realtime.addSubCategory2(this.subCategory2, this.key.key, this.key2.key)
    this.categories = []
    this.subCategories = []
  }

  listCategory(){
    this.categories = []
     this.realtime.listCategory().snapshotChanges().subscribe(data=>{
      data.forEach(k=>{
        const x = { ...k.payload.toJSON(), key: k.key}
        this.categories.push(x as Category)
      })
    })
  }

  selectedListKey(event:any){
    this.realtime.listCategoryByName(event.value).snapshotChanges().subscribe(data=>{
      data.forEach(data=>{
        const x = { ...data.payload.toJSON(), key: data.key}
        this.key = (x as Category)
      })
      this.listSubCategory()
    })
  }

  listSubCategory(){
    this.subCategories = []
      this.realtime.listSubCategory(this.key.key).snapshotChanges().subscribe(data=>{
       data.forEach(k=>{
         const x = {...k.payload.toJSON(), key:k.key}
         this.subCategories.push(x as subCategory)
       })
     })
  }


  selectedListKey2(event:any){
    this.realtime.listSubCategoryByName(event.value, this.key.key).snapshotChanges().subscribe(data=>{
      data.forEach(data=>{
        const x = { ...data.payload.toJSON(), key: data.key}
        this.key2 = (x as subCategory)
        console.log(this.key2.key)
      })
    })
  }

}
