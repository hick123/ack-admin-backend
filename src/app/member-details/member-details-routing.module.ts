import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberDetailsComponent } from './member-details/member-details.component';

const routes: Routes = [
  {path:'', component: MemberDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberDetailsRoutingModule { }
