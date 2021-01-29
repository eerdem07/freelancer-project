import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  private dbUsers = '/Users'

  userRef!: AngularFireList<User>
  constructor(
    public db: AngularFireDatabase
  ) {
    this.userRef = db.list(this.dbUsers)
  }

  addAccount(user: User) {
    return this.userRef.push(user)
  }

  listProfileByUserID(userID: string) {
    return this.db.list<User>("/Users", q => q.orderByChild("userID").equalTo(userID))
  }

}
