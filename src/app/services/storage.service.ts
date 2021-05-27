import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Doc } from '../models/doc';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  basePath = '/Docs'
  constructor(
    public storage:AngularFireStorage,
    public db:AngularFireDatabase
  ) { }

  uploadDoc(doc:Doc){
    let date = new Date()
    const docPath = this.basePath + '/' + doc.files.name
    const storageRef = this.storage.ref(docPath)
    const uploadTask = this.storage.upload(docPath,doc.files)
    uploadTask.snapshotChanges().pipe(
      finalize(()=>{
        storageRef.getDownloadURL().subscribe(urlPath=>{
          doc.url = urlPath
          doc.name = doc.files.name
          doc.date = date.getTime().toString()
          this.addDocToRTDB(doc)
        })
      })

    ).subscribe()

    return uploadTask.percentageChanges()
  }

  addDocToRTDB(doc:Doc){
    return this.db.list(this.basePath).push(doc)
  }

  listDocs(){
    return this.db.list(this.basePath)
  }

  listDocsByUid(uid:any){
    return this.db.list("Docs", q=>q.orderByChild("uid").equalTo(uid))
  }

  removeDoc(doc:Doc){
    this.removeDocFromRTDB(doc).then(()=>{
      this.removeDocFromStorage(doc)
    })
  }

  removeDocFromStorage(doc:Doc){
    const storageRef = this.storage.ref(this.basePath)
    storageRef.child(doc.name).delete()
  }

  removeDocFromRTDB(doc:Doc){
    return this.db.list(this.basePath).remove(doc.key)
  }
}
