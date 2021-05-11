import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/department';
import { subCategory } from 'src/app/models/subCategory';
import { subCategory2 } from 'src/app/models/subCategory2';
import { University } from 'src/app/models/university';
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

  university:University= new University()

  constructor(public realtime: RealtimeService)  { }

  ngOnInit(): void {
    this.listCategory()
  }

  async listCategory(){
    await this.realtime.listCategory().snapshotChanges().subscribe(data=>{
      data.forEach(k=>{
        const x = { ...k.payload.toJSON(), key: k.key}
        this.categories.push(x as Category)
      })
    })
  }

  async listSubCategory(){
     await this.realtime.listSubCategory(this.key.key).snapshotChanges().subscribe(data=>{
       data.forEach(k=>{
         const x = {...k.payload.toJSON(), key:k.key}
         this.subCategories.push(x as subCategory)
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
  }

  addSubCategory2(name:any){
    this.subCategory2.name = name
    this.realtime.addSubCategory2(this.subCategory2, this.key.key, this.key2.key)
    console.log(this.key2.key)
  }

  selectedListKey(event:any){
    this.realtime.listCategoryByName(event.value).snapshotChanges().subscribe(data=>{
      data.forEach(data=>{
        const x = { ...data.payload.toJSON(), key: data.key}
        this.key = (x as Category)
      })
      this.listSubCategory()
      this.subCategories = []
    })
  }

  selectedListKey2(event:any){
    this.realtime.listSubCategoryByName(event.value, this.key.key).snapshotChanges().subscribe(data=>{
      data.forEach(data=>{
        const x = { ...data.payload.toJSON(), key: data.key}
        this.key2 = (x as subCategory)
      })
    })
  }

}
