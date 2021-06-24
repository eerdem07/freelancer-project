import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { MessageRoom } from 'src/app/models/messageroom';
import { RealtimeService } from 'src/app/services/realtime.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-message',
  templateUrl: './my-message.component.html',
  styleUrls: ['./my-message.component.scss'],
})
export class MyMessageComponent implements OnInit {
  uid?: string;

  aliciuid?: string;
  gondericiuid?: string;

  messageRoom: MessageRoom[] = [];

  messageRoomSender: MessageRoom[] = [];
  messageRoomGetter: MessageRoom[] = [];

  messageRoom2: MessageRoom = new MessageRoom();

  constructor(
    public MessageService: MessageService,
    public realtime: RealtimeService,
    public router: Router
  ) {}

  ngOnInit() {
    this.aliciuid = this.realtime.suankiKullanici.uid;
    this.uid = this.realtime.suankiKullanici.uid;
    this.listMessageRoomOne();
    this.listMessageRoomTwo();
  }

  goMessenger(roomId: any) {
    this.router.navigate(['messenger', roomId]);
  }

  listMessageRoomOne() {
    this.MessageService.listMessageRoomGetter(this.aliciuid).subscribe(
      (datas) => {
        this.messageRoomGetter = datas;
      }
    );
  }
  listMessageRoomTwo() {
    this.MessageService.listMessageRoomSender(this.aliciuid).subscribe(
      (datas) => {
        this.messageRoomSender = datas;
        this.messageRoom = this.messageRoomGetter.concat(
          this.messageRoomSender
        );
        this.deleteMessageRoom();
      }
    );
  }

  deleteMessageRoom() {
    this.messageRoomGetter.forEach((room) => {
      if (room.aliciuid == this.uid && room.gondericiuid == this.uid) {
        this.MessageService.deleteMessageRoom(room);
      }
    });
  }

  listProfile() {
    this.realtime.listProfileByUserID(this.gondericiuid as string);
  }

  listUserName(room: any) {
    if (this.aliciuid == room.aliciuid) {
      return room.gondericiadi;
    } else if (this.aliciuid == room.gondericiuid) {
      return room.aliciadi;
    }
  }

  listProfilePhoto(room: any) {
    if (this.aliciuid == room.aliciuid) {
      return room.gondericifoto;
    } else if (this.aliciuid == room.gondericiuid) {
      return room.alicifoto;
    }
  }
}
