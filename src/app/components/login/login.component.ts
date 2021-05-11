import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Result } from 'src/app/models/result';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  result: Result = new Result()
  user: User = new User()
  constructor(
    public authService: AuthService,
    public router: Router,
    public toast: ToastrService
  ) { }

  ngOnInit() {
  }

  signIn(mail: string, password: string) {
    this.authService.signIn(mail, password).then(p => {
      localStorage.setItem("user", JSON.stringify(p.user))
      this.router.navigate(['/'])
      this.result.process = true
      this.result.message = this.toast.success("Giriş Yapıldı.", "Başarılı!")
    }, err => {
      this.result.process = false
      this.result.message = this.toast.error("CAPSLOCK Açık Olabilir.", "Giriş Yapılamadı");
    })
  }

  

}
