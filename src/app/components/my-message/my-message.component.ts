import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { MessageRoom } from 'src/app/models/messageroom';
import { RealtimeService } from 'src/app/services/realtime.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-message',
  templateUrl: './my-message.component.html',
  styleUrls: ['./my-message.component.scss']
})
export class MyMessageComponent implements OnInit {

  aliciuid?:string
  gondericiuid?:string
  messageRoom:MessageRoom[] = []
  messageRoom2:MessageRoom = new MessageRoom()

  constructor(
    public MessageService: MessageService,
    public realtime: RealtimeService,
    public router: Router
  ) { }

  ngOnInit() {
    this.aliciuid = this.realtime.suankiKullanici.uid
    this.listMessageRoom()
  }

  goMessenger(roomId:any){
    this.router.navigate(['messenger',roomId])
  }

  listMessageRoom(){
    this.MessageService.checkMessageRoom(this.aliciuid).snapshotChanges().subscribe(datas=>{
      datas.forEach(data=>{
        const q = { ...data.payload.toJSON(),key:data.key}
        this.messageRoom.push(q as MessageRoom)
      })
    })
  }

  listProfile(){
    this.realtime.listProfileByUserID(this.gondericiuid as string)
  }

}
