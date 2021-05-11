import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Result } from 'src/app/models/result';
import { RealtimeService } from 'src/app/services/realtime.service';
import { ToastrService } from 'ngx-toastr'
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { MessageRoom } from 'src/app/models/messageroom';

import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  adsoyad!: string;
  uid!: string;
  profil!: User
  result: any;

  gondericiuid?: string;
  aliciuid?:string

  message: Message = new Message()
  messageRoom: MessageRoom = new MessageRoom()

  messageRoomTest2:MessageRoom = new MessageRoom()
  messageRoomTest:MessageRoom[] = []

  key!:string;

  constructor(
    public realtime: RealtimeService,
    public toast: ToastrService,
    public route: ActivatedRoute,
    public router: Router,
    public MessageService: MessageService
  ) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem("user")!);
    this.gondericiuid = user.uid
    this.adsoyad = user.displayName
    this.route.params.subscribe(p => {
      this.uid = p.uid
    })
    this.listByProfile()
  }

  listByProfile() {
    this.realtime.listProfileByUserID(this.uid).snapshotChanges().subscribe(profiller => {
      profiller.forEach(profil => {
        const q = { ...profil.payload.val(), key: profil.key }
        this.profil = (q as User)
        this.aliciuid = this.profil.userID
      })
      this.checkMessageRoom()
    })
  }

  checkMessageRoom(){
    console.log(this.aliciuid,this.gondericiuid)
    this.MessageService.checkMessageRoom(this.aliciuid).snapshotChanges().subscribe(datas=>{
      datas.forEach(data=>{
        const q = { ...data.payload.toJSON(), key:data.key}
        this.messageRoomTest.push(q as MessageRoom)
        const a = this.messageRoomTest.filter(el=> el.gondericiuid == this.gondericiuid)
        this.messageRoomTest2 = a[0]
        this.MessageService.updateRoom(this.messageRoomTest2)
        console.log(this.messageRoomTest2)
      })
      if(!(this.messageRoomTest2.aliciuid == this.aliciuid && this.messageRoomTest2.gondericiuid == this.gondericiuid)){
        this.messageRoom.aliciuid = this.aliciuid as string
        this.messageRoom.gondericiuid =  this.gondericiuid as string
        this.MessageService.addMessageRoom(this.messageRoom)
      }
    })
  }


  editAccount() {
    this.result.process = true
    this.result.message = this.toast.warning("Eklenecektir...", "Uyarı!")
  }

  deleteAccount() {
    this.result.process = true
    this.result.message = this.toast.error("Eklenecektir...", "Uyarı!")
  }



}
