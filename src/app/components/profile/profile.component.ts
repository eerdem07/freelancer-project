import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Result } from 'src/app/models/result';
import { RealtimeService } from 'src/app/services/realtime.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { MessageRoom } from 'src/app/models/messageroom';

import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  adsoyad!: string;
  uid!: string;
  profil!: User;
  result: any;

  simdikikullaniciuid?: string;
  gondericiuid?: string;
  aliciuid?: string;

  gondericiadi?: string;
  gondericifoto?: string;

  alicifoto?: string;
  aliciadi?: string;

  message: Message = new Message();
  messageRoom: MessageRoom = new MessageRoom();

  messageRoomTest2: MessageRoom = new MessageRoom();
  messageRoomTest: MessageRoom[] = [];

  messageRoomTest3: MessageRoom = new MessageRoom();

  key!: string;

  constructor(
    public realtime: RealtimeService,
    public toast: ToastrService,
    public route: ActivatedRoute,
    public router: Router,
    public MessageService: MessageService
  ) {}

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user')!);
    this.gondericiuid = user.uid;
    this.adsoyad = user.displayName;
    this.simdikikullaniciuid = this.realtime.suankiKullanici.uid;
    this.route.params.subscribe((p) => {
      this.uid = p.uid;
      this.aliciuid = this.uid;
    });
    this.listByProfile();
    this.listProfileSender();
  }

  listByProfile() {
    this.realtime
      .listProfileByUserID(this.uid)
      .snapshotChanges()
      .subscribe((profiller) => {
        profiller.forEach((profil) => {
          const q = { ...profil.payload.val(), key: profil.key };
          this.profil = q as User;
          this.alicifoto = this.profil.photoUrl;
          this.aliciadi = this.profil.ad;
        });
        this.checkMessageRoom();
      });
  }

  listProfileSender() {
    this.MessageService.listProfileByUserID(this.gondericiuid).subscribe(
      (data) => {
        this.gondericiadi = data[0].ad;
        this.gondericifoto = data[0].photoUrl;
      }
    );
  }

  checkMessageRoom() {
    this.MessageService.checkMessageRoom(this.aliciuid as string)
      .snapshotChanges()
      .subscribe((datas) => {
        datas.forEach((data) => {
          const q = { ...data.payload.toJSON(), key: data.key };
          this.messageRoomTest.push(q as MessageRoom);
          const a = this.messageRoomTest.filter(
            (el) => el.gondericiuid == this.gondericiuid
          );
          this.messageRoomTest2 = a[0];
        });
        if (
          !(
            this.messageRoomTest2?.aliciuid == this.aliciuid &&
            this.messageRoomTest2?.gondericiuid == this.gondericiuid
          )
        ) {
          this.messageRoom.aliciuid = this.aliciuid as string;
          this.messageRoom.gondericiuid = this.gondericiuid as string;
          this.messageRoom.gondericiadi = this.gondericiadi as string;
          this.messageRoom.gondericifoto = this.gondericifoto as string;
          this.messageRoom.alicifoto = this.alicifoto as string;
          this.messageRoom.aliciadi = this.aliciadi as string;
          this.MessageService.addMessageRoom(this.messageRoom);
        }
      });
  }

  editAccount() {
    // this.result.process = true
    // this.result.message = this.toast.warning("Aktarılıyorsunuz.", "Uyarı!")
    this.router.navigate(['/profile-update/selection']);
  }

  deleteAccount() {
    this.result.process = true;
    this.result.message = this.toast.error('Eklenecektir...', 'Uyarı!');
  }
}
