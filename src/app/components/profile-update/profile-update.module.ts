import { ProfileUpdatePhotoComponent } from './profile-update-photo/profile-update-photo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileUpdatePersonelComponent } from './profile-update-personel/profile-update-personel.component';
import { ProfileUpdateEmployerComponent } from './profile-update-employer/profile-update-employer.component';
import { ProfileUpdateSelectionComponent } from './profile-update-selection/profile-update-selection.component';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  {
    path: 'personel',
    component: ProfileUpdatePersonelComponent,
  },
  {
    path: 'selection',
    component: ProfileUpdateSelectionComponent,
  },
  {
    path: 'employer',
    component: ProfileUpdateEmployerComponent,
  },
  {
    path: 'photo',
    component: ProfileUpdatePhotoComponent,
  },
];

@NgModule({
  declarations: [
    ProfileUpdatePersonelComponent,
    ProfileUpdateSelectionComponent,
    ProfileUpdateEmployerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ToastrModule.forRoot(),
  ],
})
export class ProfileUpdateModule {}
