import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/department';
import { subCategory } from 'src/app/models/subCategory';
import { subCategory2 } from 'src/app/models/subCategory2';
import { User } from 'src/app/models/user';
import { RealtimeService } from 'src/app/services/realtime.service';

@Component({
  selector: 'app-list-profile-two',
  templateUrl: './list-profile-two.component.html',
  styleUrls: ['./list-profile-two.component.scss']
})
export class ListProfileTwoComponent implements OnInit {

  categories: Category[] = []
  key: Category = new Category()
  subCategories: subCategory[] = []
  subCategories2: subCategory2[] = []
  key2: subCategory = new subCategory()

  profiles:User[] = []

  constructor(public realtime: RealtimeService) { }
  ngOnInit() {
    this.listCategory()
  }



  listCategory(){
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
    this.realtime.listSubCategory(this.key.key).snapshotChanges().subscribe(data=>{
     data.forEach(k=>{
       const x = { ...k.payload.toJSON(),key: k.key}
       this.subCategories.push(x as subCategory)
      })
    })
  }

  listSubCategory2(){
    this.subCategories2 = []
  this.realtime.listSubCategory2(this.key.key, this.key2.key).snapshotChanges().subscribe(data=>{
   data.forEach(k=>{
     const x = { ...k.payload.toJSON(),key:k.key}
     this.subCategories2.push(x as subCategory2)
     })
    })
  }

  selectedListKey2(event:any){
    this.realtime.listSubCategoryByName(event.value, this.key.key).snapshotChanges().subscribe(data=>{
      data.forEach(data=>{
        const x = { ...data.payload.toJSON(), key: data.key}
        this.key2 = (x as subCategory)
        this.listSubCategory2()
      })
    })
  }

  listProfile(categoryName:any, subCategoryName:any, subcategory2Name:any){
    if(subcategory2Name != '' && subCategoryName != '' && subcategory2Name != ''){
      this.profiles = []
      this.realtime.listProfileByCategoryEmployer(categoryName).snapshotChanges().subscribe(data=>{
        data.forEach(k=>{
          const x = { ...k.payload.toJSON(), key:k.key}
          this.profiles.push(x as User)
          this.profiles = this.profiles.filter(el=> el.type == "Personel")
          console.log(this.profiles)
        })
      })
    } else if( subcategory2Name != '' && subCategoryName != '' && subcategory2Name == ''){
      this.profiles = []
      this.realtime.listProfileByCategoryEmployer(subCategoryName).snapshotChanges().subscribe(data=>{
        data.forEach(k=>{
          const x = { ...k.payload.toJSON(), key:k.key}
          this.profiles.push(x as User)
          this.profiles = this.profiles.filter(el=> el.type == "Personel")
        })
      })
    } else {
      this.profiles = []
      this.realtime.listProfileByCategoryEmployer(subcategory2Name).snapshotChanges().subscribe(data=>{
        data.forEach(k=>{
          const x = { ...k.payload.toJSON(), key:k.key}
          this.profiles.push(x as User)
          this.profiles = this.profiles.filter(el=> el.type == "Personel")
        })
      })
    }
  }


}
