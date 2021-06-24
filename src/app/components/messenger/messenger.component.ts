import { RealtimeService } from 'src/app/services/realtime.service';
import { User } from 'src/app/models/user';
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
  styleUrls: ['./messenger.component.scss'],
})
export class MessengerComponent implements OnInit {
  aliciuid?: string;
  gondericiuid?: string;

  gondericifoto?: string;

  aliciadi?: string;
  gondericiadi?: string;

  roomId?: string;

  message: Message = new Message();
  messageList: Message[] = [];

  messageRoom: MessageRoom = new MessageRoom();

  profileSender: User[] = [];
  profileGetter: User[] = [];

  key!: string;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public MessageService: MessageService,
    public realtime: RealtimeService
  ) {}

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user')!);
    this.gondericiuid = user.uid;
    this.route.params.subscribe((p) => {
      this.roomId = p.channelRoomId;
    });
    this.listMessage();
    this.listProfileSender();
  }

  listMessage() {
    this.MessageService.listMessageByChannelRoomId(this.roomId).subscribe(
      (data) => {
        this.messageRoom = data;
        this.aliciuid = this.messageRoom.aliciuid;
        this.listProfileGetter();
      }
    );
  }

  sendMessage(body: any) {
    let tarih = new Date();
    this.message.gondericiuid = this.gondericiuid;
    this.message.aliciuid = this.aliciuid;
    this.message.body = body;
    this.message.kayTarih = tarih.getTime().toString();
    this.message.channelRoomID = this.roomId;
    this.message.gondericiadi = this.gondericiadi;
    this.message.gondericifoto = this.gondericifoto;
    this.MessageService.sendMessage(this.message);
  }

  listProfileSender() {
    this.MessageService.listProfileByUserID(this.gondericiuid).subscribe(
      (data) => {
        this.gondericiadi = data[0].ad;
        this.gondericifoto = data[0].photoUrl;
      }
    );
  }

  listProfileGetter() {
    this.MessageService.listProfileByUserID(this.aliciuid).subscribe((data) => {
      this.aliciadi = data[0].ad;
    });
  }

  changeColor(messages: Message) {
    if (messages.gondericiuid == this.gondericiuid) {
      return 'alert-primary';
    } else if (messages.aliciuid == this.gondericiuid) {
      return 'alert-success';
    } else {
      return 'alert-warning';
    }
  }
}
