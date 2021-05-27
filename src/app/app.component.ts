import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AuthService } from './services/auth.service';
import { RealtimeService } from './services/realtime.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'freelancer-project';

  userName!: string
  uid?:string
  profil!: User
  rol!:string
  constructor(
    public Auth: AuthService,
    public router: Router,
    public realtime: RealtimeService
  ) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem("user")!);
    this.userName = user.displayName!
    this.uid = user.uid
    this.listProfile()
  }

  signOut() {
    this.Auth.signOut().then(d => {
      localStorage.removeItem("user")
      localStorage.clear()
      this.router.navigate(['/login'])
    })
  }

  sessionCheck() {
    if (localStorage.getItem("user")) {
      return true
    } else {
      return false
    }
  }

  listProfile(){
    this.realtime.listProfileByUserID(this.uid as string).snapshotChanges().subscribe(profiller => {
      profiller.forEach(profil => {
        const q = { ...profil.payload.val(), key: profil.key }
        this.profil = (q as User)
        this.rol = this.profil.rol
      })
    })
  }

  checkAdmin(){
    if(this.rol == "admin"){
      return true
    }
    else{
      return false
    }
  }


}
