import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { subCategory } from 'src/app/models/subCategory';
import { subCategory2 } from 'src/app/models/subCategory2';
import { User } from 'src/app/models/user';
import { RealtimeService } from 'src/app/services/realtime.service';

import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-list-profile-one',
  templateUrl: './list-profile-one.component.html',
  styleUrls: ['./list-profile-one.component.scss'],
})
export class ListProfileOneComponent implements OnInit {
  categories: Category[] = [];
  key: Category = new Category();
  subCategories: subCategory[] = [];
  subCategories2: subCategory2[] = [];
  key2: subCategory = new subCategory();

  profiles: User[] = [];

  nowProfile2: User = new User();

  constructor(public realtime: RealtimeService, public router: Router) {}

  ngOnInit() {
    this.listCategory();
  }

  navigateProfile(uid: any) {
    this.router.navigate(['/profile', uid]);
  }

  listProfile(categoryName: any, subCategoryName: any, subcategory2Name: any) {
    this.profiles = [];
    if (
      subcategory2Name != '' &&
      subCategoryName != '' &&
      subcategory2Name != ''
    ) {
      this.realtime
        .listProfileByCategoryPersonel(categoryName)
        .snapshotChanges()
        .subscribe((data) => {
          data.forEach((k) => {
            const x = { ...k.payload.toJSON(), key: k.key };
            this.profiles.push(x as User);
            this.profiles = this.profiles.filter(
              (el) => el.type == 'Personel' && el.rol !== 'admin'
            );
          });
        });
    } else if (
      subcategory2Name != '' &&
      subCategoryName != '' &&
      subcategory2Name == ''
    ) {
      this.realtime
        .listProfileByCategoryPersonel(subCategoryName)
        .snapshotChanges()
        .subscribe((data) => {
          data.forEach((k) => {
            const x = { ...k.payload.toJSON(), key: k.key };
            this.profiles.push(x as User);
            this.profiles = this.profiles.filter(
              (el) => el.type == 'Personel' && el.rol !== 'admin'
            );
          });
        });
    } else {
      this.realtime
        .listProfileByCategoryPersonel(subcategory2Name)
        .snapshotChanges()
        .subscribe((data) => {
          data.forEach((k) => {
            const x = { ...k.payload.toJSON(), key: k.key };
            this.profiles.push(x as User);
            this.profiles = this.profiles.filter(
              (el) => el.type == 'Personel' && el.rol !== 'admin'
            );
          });
        });
    }
  }

  listCategory() {
    this.realtime
      .listCategory()
      .snapshotChanges()
      .subscribe((data) => {
        data.forEach((k) => {
          const x = { ...k.payload.toJSON(), key: k.key };
          this.categories.push(x as Category);
        });
      });
  }

  selectedListKey(event: any) {
    this.realtime
      .listCategoryByName(event.value)
      .snapshotChanges()
      .subscribe((data) => {
        data.forEach((data) => {
          const x = { ...data.payload.toJSON(), key: data.key };
          this.key = x as Category;
        });
        this.listSubCategory();
      });
  }

  listSubCategory() {
    this.subCategories = [];
    this.realtime
      .listSubCategory(this.key.key)
      .snapshotChanges()
      .subscribe((data) => {
        data.forEach((k) => {
          const x = { ...k.payload.toJSON(), key: k.key };
          this.subCategories.push(x as subCategory);
        });
      });
  }

  selectedListKey2(event: any) {
    this.realtime
      .listSubCategoryByName(event.value, this.key.key)
      .snapshotChanges()
      .subscribe((data) => {
        data.forEach((data) => {
          const x = { ...data.payload.toJSON(), key: data.key };
          this.key2 = x as subCategory;
          this.listSubCategory2();
        });
      });
  }

  listSubCategory2() {
    this.subCategories2 = [];
    this.realtime
      .listSubCategory2(this.key.key, this.key2.key)
      .snapshotChanges()
      .subscribe((data) => {
        data.forEach((k) => {
          const x = { ...k.payload.toJSON(), key: k.key };
          this.subCategories2.push(x as subCategory2);
        });
      });
  }
}
