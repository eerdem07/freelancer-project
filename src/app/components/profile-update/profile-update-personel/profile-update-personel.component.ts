import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Result } from 'src/app/models/result';
import { subCategory } from 'src/app/models/subCategory';
import { subCategory2 } from 'src/app/models/subCategory2';
import { University } from 'src/app/models/university';
import { User } from 'src/app/models/user';
import { RealtimeService } from 'src/app/services/realtime.service';

@Component({
  selector: 'app-profile-update-personel',
  templateUrl: './profile-update-personel.component.html',
  styleUrls: ['./profile-update-personel.component.scss'],
})
export class ProfileUpdatePersonelComponent implements OnInit {
  categories: Category[] = [];
  key: Category = new Category();
  subCategories: subCategory[] = [];
  subCategories2: subCategory2[] = [];
  key2: subCategory = new subCategory();

  universities: University[] = [];

  user: User = new User();
  nowUser: User = new User();

  updateProfileKey!: any;

  result: Result = new Result();

  constructor(
    public realtime: RealtimeService,
    public router: Router,
    public toast: ToastrService
  ) {}

  ngOnInit() {
    this.listCategory();
    this.listUniversity();
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

  listUniversity() {
    this.realtime
      .listUniversity()
      .snapshotChanges()
      .subscribe((data) => {
        data.forEach((k) => {
          const x = { ...k.payload.toJSON(), key: k.key };
          this.universities.push(x as University);
        });
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

  updateProfile(
    category: any,
    subcategory: any,
    subcategory2: any,
    ozgecmis: any,
    university: any
  ) {
    this.realtime
      .listProfileByUserID(this.realtime.suankiKullanici.uid)
      .snapshotChanges()
      .subscribe((data) => {
        data.forEach((k) => {
          const x = { ...k.payload.toJSON(), key: k.key };
          this.nowUser = x as User;
        });
        this.nowUser.ozgecmis = ozgecmis;
        this.nowUser.bolum = category;
        this.nowUser.altKategori = subcategory;
        this.nowUser.yetenekler = subcategory2;
        this.nowUser.university = university;
        this.realtime.updateAccount(this.nowUser);
      });
    this.router.navigate(['/profile-update/photo']);
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
}
