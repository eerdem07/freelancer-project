import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileUpdatePersonelComponent } from './profile-update-personel/profile-update-personel.component';
import { ProfileUpdateEmployerComponent } from './profile-update-employer/profile-update-employer.component';
import { ProfileUpdateSelectionComponent } from './profile-update-selection/profile-update-selection.component';

const routes: Routes = [
  {
    path:'personel',
    component:ProfileUpdatePersonelComponent
  },
  {
    path:'selection',
    component:ProfileUpdateSelectionComponent
  },
  {
    path:'employer',
    component:ProfileUpdateEmployerComponent
  }
]

@NgModule({
  declarations: [ProfileUpdatePersonelComponent,ProfileUpdateSelectionComponent,ProfileUpdateEmployerComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes),FormsModule
  ]
})
export class ProfileUpdateModule { }
