import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProfileOneComponent } from './list-profile-one/list-profile-one.component';
import { ListProfileTwoComponent } from './list-profile-two/list-profile-two.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'personel',
    component: ListProfileOneComponent,
  },
  {
    path: 'employer',
    component: ListProfileTwoComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
  declarations: [ListProfileOneComponent, ListProfileTwoComponent],
})
export class ListProfileModule {}
