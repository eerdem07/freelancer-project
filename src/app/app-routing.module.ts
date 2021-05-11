import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { DocsComponent } from './components/docs/docs.component';
import { DocumentComponent } from './components/document/document.component';

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
    component: MessengerComponent
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
    loadChildren: () => import("./components/profile-update/profile-update.module").then(m=> m.ProfileUpdateModule)
  },
  {
    path: 'admin',
    loadChildren: () => import("./components/admin/admin.module").then(m=>m.AdminModule)
  },
  {
    path: 'list-profile',
    loadChildren: () => import("./components/list-profile/list-profile.module").then(m=> m.ListProfileModule)
  },
  {
    path: 'docs',
    loadChildren:()=> import("./components/docs/docs.module").then(m=>m.DocsModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
