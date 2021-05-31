import { RealtimeService } from 'src/app/services/realtime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  jobId?:string

  job?:Job

  constructor(
    public route:ActivatedRoute,
    public realtime:RealtimeService,
    public router:Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      this.jobId = p.id
    })
    this.listJob()
  }


  listJob(){
    this.realtime.listJobByKey(this.jobId as string).subscribe(datas=>{
      this.job = datas as Job
    })
  }

  navigateProfile(uid:any){
    this.router.navigate(['profile',uid])
  }

}
