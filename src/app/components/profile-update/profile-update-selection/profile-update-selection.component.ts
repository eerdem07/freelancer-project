import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RealtimeService } from 'src/app/services/realtime.service';

@Component({
  selector: 'app-profile-update-selection',
  templateUrl: './profile-update-selection.component.html',
  styleUrls: ['./profile-update-selection.component.scss']
})
export class ProfileUpdateSelectionComponent implements OnInit {

  nowUser: User = new User()

  constructor(
    public realtime: RealtimeService,
    public router: Router) { }

  ngOnInit() {
  }

  updateEmployer(){
    this.realtime.listProfileByUserID(this.realtime.suankiKullanici.uid).snapshotChanges().subscribe(data=>{
      data.forEach(k=>{
        const x = { ...k.payload.toJSON(), key:k.key}
        this.nowUser = (x as User)
      })
        this.nowUser.type = "Employer"
        this.realtime.updateAccount(this.nowUser)
    })
    this.router.navigate(['/profile-update/employer'])
  }

  updatePersonel(){
    this.realtime.listProfileByUserID(this.realtime.suankiKullanici.uid).snapshotChanges().subscribe(data=>{
      data.forEach(k=>{
        const x = { ...k.payload.toJSON(), key:k.key}
        this.nowUser = (x as User)
      })
        this.nowUser.type = "Personel"
        this.realtime.updateAccount(this.nowUser)
    })
    this.router.navigate(['/profile-update/personel'])
  }

}
