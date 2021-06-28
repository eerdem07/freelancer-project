import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Doc } from 'src/app/models/doc';
import { Result } from 'src/app/models/result';
import { User } from 'src/app/models/user';
import { RealtimeService } from 'src/app/services/realtime.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile-update-photo',
  templateUrl: './profile-update-photo.component.html',
  styleUrls: ['./profile-update-photo.component.scss'],
})
export class ProfileUpdatePhotoComponent implements OnInit {
  files!: FileList;

  uid!: string;

  nowUser: User = new User();

  percent?: any;

  docs: Doc[] = [];
  lastDoc: Doc = new Doc();

  photoDoc: Doc[] = [];
  photoDoc2: Doc = new Doc();

  url?: any;

  result: Result = new Result();

  constructor(
    private storage: StorageService,
    public realtime: RealtimeService,
    public toast: ToastrService,
    public router: Router
  ) {}

  ngOnInit() {
    this.uid = this.realtime.suankiKullanici.uid;
  }

  selectDoc(event: any) {
    this.files = event.target.files;
  }

  uploadDoc() {
    let doc = new Doc();
    doc.uid = this.uid;
    doc.files = this.files[0];
    this.storage.uploadDoc(doc).subscribe(
      (p) => {
        this.percent = p;
        if (p == 100) {
          this.listDoc();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  listDoc() {
    this.storage
      .listDocsByUid(this.uid)
      .snapshotChanges()
      .subscribe((data) => {
        this.docs = [];
        data.forEach((document) => {
          const y = { ...document.payload.toJSON(), key: document.key };
          this.docs.push(y as Doc);
          this.lastDoc = this.docs[this.docs.length - 1];
          this.url = this.lastDoc.url;
        });
      });
  }

  updateProfilePhoto() {
    this.realtime
      .listProfileByUserID(this.realtime.suankiKullanici.uid)
      .snapshotChanges()
      .subscribe((data) => {
        data.forEach((k) => {
          const x = { ...k.payload.toJSON(), key: k.key };
          this.nowUser = x as User;
        });
        this.nowUser.photoUrl = this.url;
        this.realtime.updateAccount(this.nowUser);
      });
    this.result.message = this.toast.success(
      'Profil Güncellendi.',
      'Anasayfaya Yönlendiriliyorsunuz.!'
    );
    this.router.navigate(['/profile', this.uid]);
  }
}
