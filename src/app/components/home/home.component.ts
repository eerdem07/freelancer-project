import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RealtimeService } from 'src/app/services/realtime.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  profiles:User[] = []

  constructor(public realtime: RealtimeService) { }

  ngOnInit() {
    this.listProfile()
  }

  listProfile(){
    this.realtime.listProfile().snapshotChanges().subscribe(data=>{
      data.forEach(k=>{
        const x = { ...k.payload.toJSON(), key:k.key}
        this.profiles.push(x as User)
        this.profiles= this.profiles.filter(el=>el.rol !== "admin" && el.type=="Personel")
      })
    })
  }




}
