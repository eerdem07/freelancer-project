import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'freelancer-project';

  userName!: string
  uid?:string
  constructor(
    public Auth: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let user = JSON.parse(localStorage.getItem("user")!);
    this.userName = user.displayName!
    this.uid = user.uid
  }

  signOut() {
    this.Auth.signOut().then(d => {
      localStorage.removeItem("user")
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
}
