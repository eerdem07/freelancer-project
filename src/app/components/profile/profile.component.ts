import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Result } from 'src/app/models/result';
import { RealtimeService } from 'src/app/services/realtime.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  adsoyad!: string;
  uid!: string;
  profil!: User
  result: any;
  constructor(
    public realtime: RealtimeService,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem("user")!);
    this.adsoyad = user.displayName
    this.uid = user.uid
    this.listByProfile()
  }

  async listByProfile() {
    await this.realtime.listProfileByUserID(this.uid).snapshotChanges().subscribe(profiller => {
      profiller.forEach(profil => {
        const q = { ...profil.payload.val(), key: profil.key }
        this.profil = (q as User)
      })
    })
  }

  editAccount() {
    this.result.process = true
    this.result.message = this.toast.warning("Eklenecektir...", "Uyarı!")
  }

  deleteAccount() {
    this.result.process = true
    this.result.message = this.toast.error("Eklenecektir...", "Uyarı!")
  }

}
