import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListJobComponent } from './list-job.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:ListJobComponent
  }
]

@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ],
  declarations: [ListJobComponent]
})
export class ListJobModule { }
