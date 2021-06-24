import { NasilCalisirComponent } from './components/nasil-calisir/nasil-calisir.component';
import { ProfileUpdateSelectionComponent } from './components/profile-update/profile-update-selection/profile-update-selection.component';
import { ProfileUpdatePersonelComponent } from './components/profile-update/profile-update-personel/profile-update-personel.component';
import { ProfileUpdateEmployerComponent } from './components/profile-update/profile-update-employer/profile-update-employer.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { JobComponent } from './components/job/job.component';
import { MyJobComponent } from './components/my-job/my-job.component';
import { CommonModule } from '@angular/common';
import { MessengerComponent } from './components/messenger/messenger.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMessageComponent } from './components/my-message/my-message.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ProfileComponent,
    MessengerComponent,
    MyMessageComponent,
    MyJobComponent,
    JobComponent,
    ResetPasswordComponent,
    NasilCalisirComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
