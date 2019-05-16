import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { MemberDetailsComponent } from './member-details/member-details.component';

const routes: Routes = [
    { path: '', component: MembersComponent },
    // { path: 'member-details', component: MemberDetailsComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
