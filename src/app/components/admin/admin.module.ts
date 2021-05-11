import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent
  }
]

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), FormsModule
  ]
})
export class AdminModule { }
