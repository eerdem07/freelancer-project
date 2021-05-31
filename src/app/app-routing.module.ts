import { MyJobComponent } from './components/my-job/my-job.component';
import { JobComponent } from './components/job/job.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { DocsComponent } from './components/docs/docs.component';
import { MyMessageComponent } from './components/my-message/my-message.component';

const redirectLogin = () => redirectUnauthorizedTo(['login'])
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'signup',
    component: SignUpComponent
  },

  {
    path: 'messenger/:channelRoomId',
    component: MessengerComponent,
    canActivate:[AngularFireAuthGuard],
    data:{
      authGuardPipe:redirectLogin
    }
  },
  {
    path: 'my-message',
    component: MyMessageComponent,
    canActivate:[AngularFireAuthGuard],
    data:{
      authGuardPipe:redirectLogin
  }
  },
  {
    path: 'profile/:uid',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
  }
  },
  {
    path: 'profile-update',
    loadChildren: () => import("./components/profile-update/profile-update.module").then(m=> m.ProfileUpdateModule),
    canActivate:[AngularFireAuthGuard],
    data:{
      authGuardPipe:redirectLogin
    }
  },
  {
    path: 'admin',
    loadChildren: () => import("./components/admin/admin.module").then(m=>m.AdminModule),
    canActivate:[AngularFireAuthGuard],
    data:{
      authGuardPipe:redirectLogin
    }
  },
  {
    path: 'list-profile',
    loadChildren: () => import("./components/list-profile/list-profile.module").then(m=> m.ListProfileModule),
    canActivate:[AngularFireAuthGuard],
    data:{
      authGuardPipe:redirectLogin
    }
  },
  {
    path: 'docs',
    loadChildren:()=> import("./components/docs/docs.module").then(m=>m.DocsModule),
    canActivate:[AngularFireAuthGuard],
    data:{
      authGuardPipe:redirectLogin
    }
  },
  {
    path:'post-job',
    loadChildren:()=>import("./components/post-job/post-job.module").then(m=>m.PostJobModule),
    canActivate:[AngularFireAuthGuard],
    data:{
      authGuardPipe:redirectLogin
    }
  },
  {
    path:'list-job',
    loadChildren:()=>import("./components/list-job/list-job.module").then(m=>m.ListJobModule),
    // canActivate:[AngularFireAuthGuard],
    // data:{
    //   authGuardPipe:redirectLogin
    // }
  },
  {
    path:'job/:id',
    component:JobComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },
  {
    path:'my-job',
    component:MyJobComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
