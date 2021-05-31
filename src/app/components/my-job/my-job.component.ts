import { RealtimeService } from 'src/app/services/realtime.service';
import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.component.html',
  styleUrls: ['./my-job.component.scss']
})
export class MyJobComponent implements OnInit {

  uid?:string

  jobs:Job[]=[]

  constructor(
    public realtime:RealtimeService
  ) { }

  ngOnInit() {
    this.uid = this.realtime.suankiKullanici.uid
    this.listJobByUid()
  }

  listJobByUid(){
    this.realtime.listJobByUid(this.uid).snapshotChanges().subscribe(datas=>{
      datas.forEach(data=>{
        const jobs = {...data.payload.toJSON(),key:data.key}
        this.jobs.push(jobs as Job)
        console.log(this.jobs)
      })
    })
  }


  // listJobByUid(){
  //   this.realtime.listJobByUid(this.uid).subscribe(datas=>{
  //     console.log(datas)
  //   })
  // }

}
