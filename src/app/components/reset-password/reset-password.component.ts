import { Result } from 'src/app/models/result';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  result: Result = new Result()
  visible?:boolean
  visible2?:boolean
  constructor(
    public Auth:AuthService
  ) { }

  ngOnInit() {
    this.visible2 = false
  }

  resetPassword(email:any){
    this.visible = true
    this.Auth.resetPassword(email)
    .then(()=>{
      this.result.message = "Sıfırlama bağlantısı gönderildi. Yeni kod için 60 sn bekleyiniz."
      this.result.process = true
      this.visible2 = true
      setTimeout(()=>{
        this.visible = false
        this.visible2 = false
      },60000)
    },err=>{
      this.result.message = "Sıfırlama bağlantısı gönderilemedi."
      this.result.process = false
      this.visible2 = true
      this.visible = false
    })
  }

}
