import { Router } from '@angular/router';
import { subJobCategory } from './../../models/subJobCategory';
import { JobCategory } from './../../models/jobCategory';
import { RealtimeService } from 'src/app/services/realtime.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-list-job',
  templateUrl: './list-job.component.html',
  styleUrls: ['./list-job.component.scss'],
})
export class ListJobComponent implements OnInit {
  jobCategories: JobCategory[] = [];
  jobCategoriesTest: JobCategory = new JobCategory();
  jobSubCategories: JobCategory[] = [];

  jobs: Job[] = [];

  constructor(public realtime: RealtimeService, public router: Router) {}

  ngOnInit() {
    this.listCategory();
  }

  listJob(categoryName: string, subCategoryName: string, time: string) {
    if (
      categoryName !== 'Lütfen Seçiniz.' &&
      subCategoryName !== 'Lütfen Seçiniz.'
    ) {
      if (time == 'Herhangi bir gün' || time == 'Lütfen Seçiniz.') {
        this.realtime.listjob().subscribe((data) => {
          this.jobs = data.filter(
            (el) =>
              el.subCategory == subCategoryName &&
              (el.time == 'Herhangi bir gün' || el.time == 'Lütfen Seçiniz.')
          );
        });
      } else if (time == '1 gün içinde') {
        this.realtime.listjob().subscribe((data) => {
          this.jobs = data.filter(
            (el) =>
              el.subCategory == subCategoryName && el.time == '1 gün içinde'
          );
        });
      } else if (time == '3 gün içinde') {
        this.realtime.listjob().subscribe((data) => {
          this.jobs = data.filter(
            (el) =>
              el.subCategory == subCategoryName && el.time == '3 gün içinde'
          );
        });
      } else if (time == '7 gün içinde') {
        this.realtime.listjob().subscribe((data) => {
          this.jobs = data.filter(
            (el) =>
              el.subCategory == subCategoryName && el.time == '7 gün içinde'
          );
        });
      }
    } else if (categoryName !== 'Lütfen Seçiniz.') {
      if (time == 'Herhangi bir gün' || time == 'Lütfen Seçiniz.') {
        this.realtime.listjob().subscribe((data) => {
          this.jobs = data.filter(
            (el) =>
              el.category == categoryName &&
              (el.time == 'Herhangi bir gün' || el.time == 'Lütfen Seçiniz.')
          );
        });
      } else if (time == '1 gün içinde') {
        this.realtime.listjob().subscribe((data) => {
          this.jobs = data.filter(
            (el) => el.category == categoryName && el.time == '1 gün içinde'
          );
        });
      } else if (time == '3 gün içinde') {
        this.realtime.listjob().subscribe((data) => {
          this.jobs = data.filter(
            (el) => el.category == categoryName && el.time == '3 gün içinde'
          );
        });
      } else if (time == '7 gün içinde') {
        this.realtime.listjob().subscribe((data) => {
          this.jobs = data.filter(
            (el) => el.category == categoryName && el.time == '7 gün içinde'
          );
        });
      }
      // this.realtime.listjob().subscribe((data) => {
      //   this.jobs = data.filter((el) => el.category == categoryName);
      // });
    }
  }

  navigateJob(key: any) {
    this.router.navigate(['/job', key]);
  }

  listCategory() {
    this.realtime
      .listJobCategory()
      .snapshotChanges()
      .subscribe((datas) => {
        datas.forEach((data) => {
          const category = { ...data.payload.toJSON(), key: data.key };
          this.jobCategories.push(category as JobCategory);
        });
      });
  }

  selectedListKey(event: any) {
    this.realtime
      .listJobCategoryByName(event.value)
      .snapshotChanges()
      .subscribe((datas) => {
        datas.forEach((data) => {
          const categoryTest = { ...data.payload.toJSON(), key: data.key };
          this.jobCategoriesTest = categoryTest as JobCategory;
        });
        this.listJobSubCategory();
      });
  }

  listJobSubCategory() {
    this.jobSubCategories = [];
    this.realtime
      .listJobSubCategory(this.jobCategoriesTest.key as any)
      .snapshotChanges()
      .subscribe((datas) => {
        datas.forEach((data) => {
          const SubCategory = { ...data.payload.toJSON(), key: data.key };
          this.jobSubCategories.push(SubCategory as subJobCategory);
        });
      });
  }
}
