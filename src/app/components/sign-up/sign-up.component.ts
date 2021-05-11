import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Result } from 'src/app/models/result';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RealtimeService } from 'src/app/services/realtime.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  result: Result = new Result()
  user: User = new User()
  constructor(
    public authService: AuthService,
    public realtime: RealtimeService,
    public router: Router,
    public toast: ToastrService
  ) { }

  ngOnInit() {
  }

  signUp() {
    this.authService.signUp(this.user).then(d => {
      d.user!.updateProfile({
        displayName: `${this.user.ad}`
      }).then(() => {
        this.user.userID = d.user!.uid
        localStorage.setItem("user", JSON.stringify(d.user))
        this.addAccount()
        this.result.process = true
        this.result.message = this.toast.success("Kayıt Yapıldı.", "Anasayfaya Yönlendiriliyorsunuz.!")
      })
    }, err => {
      this.result.process = false
      this.result.message = this.toast.error("Bilgileri kontrol ediniz.", "Kayıt Yapılamadı");
    })
  }

  addAccount() {
    this.realtime.addAccount({ ...this.user, rol: "user", }).then(d => {
      this.router.navigate(['/profile-update/selection'])
    })
  }

}
