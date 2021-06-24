import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostJobComponent } from './post-job.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PostJobComponent,
  },
];

@NgModule({
  declarations: [PostJobComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PostJobModule {}
