import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { subJobCategory } from './../../models/subJobCategory';
import { JobCategory } from './../../models/jobCategory';
import { RealtimeService } from 'src/app/services/realtime.service';
import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job';
import { Doc } from 'src/app/models/doc';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {

  jobCategories:JobCategory[] = []
  jobSubCategories:JobCategory[] = []

  jobCategoriesTest:JobCategory = new JobCategory()

  job:Job = new Job()

  files!:FileList

  percent?:any

  uid?:string

  docs : Doc[] = []
  lastDoc:Doc = new Doc()

  profile?:User

  constructor(
    public realtime:RealtimeService,
    public storage:StorageService,
    public router:Router
  ) { }

  ngOnInit() {
    this.uid = this.realtime.suankiKullanici.uid
    this.listJobCategory()
    this.listProfile()
  }

  addJob(name:string, desc:string, category:string, subCategory:string){
    this.job.name = name
    this.job.desc = desc
    this.job.category = category
    this.job.subCategory = subCategory
    this.job.user = this.profile
    this.job.uid = this.realtime.suankiKullanici.uid
    this.realtime.addJob(this.job)
    this.router.navigate([''])
  }

  uploadDoc(){
    let doc = new Doc()
    doc.uid = this.realtime.suankiKullanici.uid
    doc.files = this.files[0]
    this.storage.uploadDoc(doc).subscribe(
      p=>{
        this.percent = p
      }, err=>{
        console.log(err)
      }
    )
    this.listDoc()
  }

  selectDoc(event:any){
    this.files=event.target.files
  }

  listJobCategory(){
    this.realtime.listJobCategory().snapshotChanges().subscribe(datas=>{
      datas.forEach(data=>{
        const category = {...data.payload.toJSON(), key:data.key}
        this.jobCategories.push(category as JobCategory)
      })
    })
  }

  selectedKey(event:any){
    this.realtime.listJobCategoryByName(event.value).snapshotChanges().subscribe(datas=>{
      datas.forEach(data=>{
        const category = {...data.payload.toJSON(), key:data.key}
        this.jobCategoriesTest = (category as JobCategory)
      })
      this.listJobSubCategory()
    })
  }

  listJobSubCategory(){
    this.jobSubCategories = []
    this.realtime.listJobSubCategory(this.jobCategoriesTest.key as any).snapshotChanges().subscribe(datas=>{
      datas.forEach(data=>{
        const category = { ...data.payload.toJSON(), key:data.key}
        this.jobSubCategories.push(category as subJobCategory)
      })
    })
  }

  listDoc(){
    this.storage.listDocsByUid(this.uid).snapshotChanges().subscribe(data=>{
      this.docs=[]
        data.forEach(document=>{
          const y = { ...document.payload.toJSON(), key:document.key}
          this.docs.push(y as Doc)
          this.lastDoc = this.docs[this.docs.length -1]
          this.job.photoUrl = this.lastDoc.url as string
        })
    })
  }

  listProfile(){
    this.realtime.listProfileByUserID(this.realtime.suankiKullanici.uid).snapshotChanges().subscribe(datas=>{
      datas.forEach(data=>{
        const profile = { ...data.payload.toJSON(), key:data.key}
        this.profile = (profile as User)
      })
    })
  }

}
