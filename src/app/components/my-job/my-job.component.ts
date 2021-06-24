import { Router } from '@angular/router';
import { RealtimeService } from './../../services/realtime.service';
import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.component.html',
  styleUrls: ['./my-job.component.scss'],
})
export class MyJobComponent implements OnInit {
  jobs: Job[] = [];

  constructor(public realtime: RealtimeService, public router: Router) {}

  ngOnInit() {
    this.listJobsByUid();
  }

  listJobsByUid() {
    this.realtime
      .listJobByUid(this.realtime.suankiKullanici.uid)
      .snapshotChanges()
      .subscribe((datas) => {
        datas.forEach((data) => {
          const jobs = { ...data.payload.toJSON(), key: data.key };
          this.jobs.push(jobs as Job);
        });
      });
  }

  navigateJob(key: any) {
    this.router.navigate(['job', key]);
  }

  deleteJob(key: any) {
    this.realtime.deleteJob(key);
  }
}
