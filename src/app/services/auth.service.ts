import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public Auth: AngularFireAuth) { }

  signIn(mail: string, password: string) {
    return this.Auth.signInWithEmailAndPassword(mail, password)
  }

  signUp(user: User) {
    return this.Auth.createUserWithEmailAndPassword(user.mail, user.password)
  }

  signOut() {
    return this.Auth.signOut()
  }

  sessionCheck() {
    if (localStorage.getItem("user")) {
      return true
    } else {
      return false
    }
  }
}
