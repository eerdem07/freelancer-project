import { Component, OnInit } from '@angular/core';
import { Doc } from 'src/app/models/doc';
import { User } from 'src/app/models/user';
import { RealtimeService } from 'src/app/services/realtime.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  docs : Doc[] = []
  files!:FileList

  uid!:string

  nowUser: User = new User()

  progress?:string
  constructor(
    private storage:StorageService,
    public realtime: RealtimeService
  ) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem("user")!);
    this.uid = user.uid
    this.listDoc()
  }

  listDoc(){
    this.storage.listDocsByUid(this.uid).snapshotChanges().subscribe(data=>{
      this.docs=[]
        data.forEach(document=>{
          const y = { ...document.payload.toJSON(), key:document.key}
          this.docs.push(y as Doc)
        })
    })
  }

  selectDoc(event:any){
    this.files=event.target.files
  }

  uploadDoc(){
    let doc = new Doc()
    doc.uid = this.uid
    doc.files = this.files[0]
    this.storage.uploadDoc(doc).subscribe(
      p=>{
        this.progress = p as unknown as string
      }, err=>{
        console.log(err)
      }
    )
  }

  deleteDoc(doc:Doc){
    this.storage.removeDoc(doc)
  }

  updateProfilePhoto(url:any){
    this.realtime.listProfileByUserID(this.realtime.suankiKullanici.uid).snapshotChanges().subscribe(data=>{
      data.forEach(k=>{
        const x = { ...k.payload.toJSON(), key:k.key}
        this.nowUser = (x as User)
      })
        this.nowUser.photoUrl = url
        this.realtime.updateAccount(this.nowUser)
    })
  }

}
