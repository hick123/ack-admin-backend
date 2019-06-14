import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContributionListComponent } from './contribution-list/contribution-list.component';

const routes: Routes = [
  {path:'', component:ContributionListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContributionRoutingModule { }
