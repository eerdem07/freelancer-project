
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Message } from '../models/message';
import { MessageRoom } from '../models/messageroom';
import { User } from '../models/user';

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

  async addMessageRoom(room: MessageRoom){
      await this.messageRoomRef.push(room)
   }

  checkMessageRoom(aliciuid:string){
    return this.db.list("MessageRoom", q=>q.orderByChild("aliciuid").equalTo(aliciuid))
  }

  async deleteMessageRoom(messageRoom:MessageRoom){
    await this.db.list("MessageRoom").remove(messageRoom.key)
  }

  checkMessageRoomGetter(aliciuid:string){
    return this.db.list("MessageRoom", q=>q.orderByChild("aliciuid").equalTo(aliciuid))
  }

  checkMessageRoomSender(gondericiuid:string){
    return this.db.list("MessageRoom", q=>q.orderByChild("gondericiuid").equalTo(gondericiuid))
  }

  async sendMessage(message:any){
    await this.messageRef.push(message)
  }

  async updateRoom(messageRoom:any){
    await this.db.list("MessageRoom").update(messageRoom.key,messageRoom)
  }

  listProfileByUserID(userID:any){
    return this.db.list<User>("/Users", q=> q.orderByChild("userID").equalTo(userID as string)).snapshotChanges().pipe(
      map(changes=>{
        return changes.map(change=>{
          const profile = { ...change.payload.val()!, key:change.key}
          return profile
        })
      })
    )
  }

  listMessageRoomGetter(uid:any){
    return this.db.list<MessageRoom>("/MessageRoom",q=>q.orderByChild('aliciuid').equalTo(uid)).snapshotChanges().pipe(
      map(changes=>{
        return changes.map(change=>{
          const messageRoom = { ...change.payload.val()!, key:change.key} as MessageRoom
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
      })
    )
  }

  listMessageRoomSender(uid:any){
    return this.db.list<MessageRoom>("/MessageRoom",q=>q.orderByChild('gondericiuid').equalTo(uid)).snapshotChanges().pipe(
      map(changes=>{
        return changes.map(change=>{
          const messageRoom = { ...change.payload.val()!, key:change.key} as MessageRoom
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
      })
    )
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
