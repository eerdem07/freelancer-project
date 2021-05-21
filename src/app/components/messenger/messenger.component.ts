import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { MessageRoom } from 'src/app/models/messageroom';
import { MessageService } from 'src/app/services/message.service';
import { map } from 'rxjs/operators';
import { queueScheduler } from 'rxjs';


@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {

  aliciuid?: string;
  gondericiuid?: string;

  roomId?: string

  message: Message = new Message()
  messageList: Message[] = []

  messageRoom: MessageRoom = new MessageRoom()

  // messageRoomTest2:MessageRoom = new MessageRoom()
  // messageRoomTest:MessageRoom[] = []

  key!:string;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public MessageService: MessageService
    ) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem("user")!);
    this.gondericiuid = user.uid
    this.route.params.subscribe(p => {
      this.roomId = p.channelRoomId
    })
    this.listMessage()
  }

  listMessage(){
    this.MessageService.listMessageByChannelRoomId(this.roomId).subscribe(data=>{
      this.messageRoom = data
      this.aliciuid = this.messageRoom.aliciuid
      console.log(this.messageRoom)
    })
  }

  sendMessage(body:any){
    let tarih = new Date()
    this.message.gondericiuid = this.gondericiuid
    this.message.body = body
    this.message.kayTarih = tarih.getTime().toString()
    this.message.channelRoomID = this.roomId
    this.MessageService.sendMessage(this.message)
  }

   // listMessage(){
  //   this.MessageService.listMessageByChannelRoomId(this.roomId).snapshotChanges().subscribe(data=>{
  //     data.forEach(k=>{
  //       const x = { ...k.payload.toJSON(), key:k.key}
  //       this.messageList.push(x as Message)
  //       this.messageList2 = this.messageList[this.messageList.length -1]
  //       console.log(this.messageList)
  //     })
  //   })
  // }

  // listMessage(){
  //   this.MessageService.listMessage().snapshotChanges().subscribe(data=>{
  //     data.forEach()
  //   })
  // }

   // addMessageOrListMessage(){
  //   if(this.messageRoomTest2.aliciuid == this.aliciuid && this.messageRoomTest2.gondericiuid == this.gondericiuid){
  //     this.listMessage()
  //   } else{
  //     this.messageRoom.aliciuid = this.aliciuid as string
  //     this.messageRoom.gondericiuid =  this.gondericiuid as string
  //     this.messageRoom.key2 = this.messageRoom.key
  //     this.MessageService.addMessageRoom(this.messageRoom)
  //   }
  // }

  // createMessageRoom(){
  //   this.messageRoom.aliciuid = this.aliciuid as string
  //   this.messageRoom.gondericiuid =  this.gondericiuid as string
  //   this.messageRoom.key2 = this.messageRoom.key
  //   this.MessageService.addMessageRoom(this.messageRoom)
  // }

    // checkMessageRoom(){
  //   this.MessageService.checkMessageRoom(this.aliciuid).snapshotChanges().subscribe(datas=>{
  //     datas.forEach(data=>{
  //       const q = { ...data.payload.toJSON(), key:data.key}
  //       this.messageRoomTest.push(q as MessageRoom)
  //       this.messageRoomTest2 = this.messageRoomTest[0]
  //       this.MessageService.updateRoom(this.messageRoomTest2)

  //     })
  //     if(this.messageRoomTest2.aliciuid == this.aliciuid && this.messageRoomTest2.gondericiuid == this.gondericiuid){
  //       this.listMessage()
  //     } else {
  //       this.messageRoom.aliciuid = this.aliciuid as string
  //       this.messageRoom.gondericiuid =  this.gondericiuid as string
  //       this.MessageService.addMessageRoom(this.messageRoom)
  //     }
  //   })
  // }

}
