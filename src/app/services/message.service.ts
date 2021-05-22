
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Message } from '../models/message';
import { MessageRoom } from '../models/messageroom';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private dbMessageRoom = '/MessageRoom'
  private dbMessage = '/Message'

  messageRoomRef!: AngularFireList<MessageRoom>
  messageRef!: AngularFireList<Message>

constructor(
  public db: AngularFireDatabase
  ) {
    this.messageRoomRef = db.list(this.dbMessageRoom)
    this.messageRef = db.list(this.dbMessage)
   }

  addMessageRoom(room: MessageRoom){
     return this.messageRoomRef.push(room)
   }

  checkMessageRoom(aliciuid:any){
    return this.db.list("MessageRoom", q=>q.orderByChild("aliciuid").equalTo(aliciuid))
  }

  sendMessage(message:any){
    this.messageRef.push(message)
  }

  async updateRoom(messageRoom:any){
    await this.db.list("MessageRoom").update(messageRoom.key,messageRoom)
  }


  listMessageByChannelRoomId(key:any){
    return this.db.object<MessageRoom>("/MessageRoom/" + key).snapshotChanges().pipe(
      map((change)=>{
        const messageRoom:MessageRoom = {...change.payload.val()!, key:change.key as string}

        this.db.list<Message>(this.dbMessage,ref=>ref.orderByChild('channelRoomID').equalTo(messageRoom.key as string)).snapshotChanges().pipe(
          map(changes=>{
            return changes.map(change=>{
              const message = { ...change.payload.val()!, key:change.key} as Message
              return message
            })
          })
        ).subscribe(messages => messageRoom.messages = messages)
        return messageRoom
      })
    )
  }





}
