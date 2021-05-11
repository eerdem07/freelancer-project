import { Component, OnInit } from '@angular/core';
import { Doc } from 'src/app/models/doc';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  docs : Doc[] = []
  files!:FileList
  constructor(
    private storage:StorageService
  ) { }

  ngOnInit() {
    this.listDoc()
  }

  listDoc(){
    this.storage.listDocs().snapshotChanges().subscribe(data=>{
      data.forEach(document=>{
        const y = {...document.payload.toJSON(), key:document.key}
        this.docs.push(y as Doc)
      })
    })
  }

  selectDoc(event:any){
    this.files=event.target.files
  }

  uploadDoc(){
    let doc = new Doc()
    doc.files = this.files[0]
    this.storage.uploadDoc(doc).subscribe(
      p=>{
        console.log(p)
      }, err=>{
        console.log(err)
      }
    )
  }

  deleteDoc(doc:Doc){
    this.storage.removeDoc(doc)
  }

}
