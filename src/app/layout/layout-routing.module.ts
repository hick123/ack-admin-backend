import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NoDashComponent } from './no-dash/no-dash.component';
import { AuthGuard } from './../_guards/auth.guard';

// const routes: Routes = [];
const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
      { path: 'groups', loadChildren: '../groups/groups.module#GroupsModule' },
      { path: 'clusters', loadChildren: '../clusters/clusters.module#ClustersModule' },
      { path: 'clusters/:clusters_id', loadChildren: '../cluster-details/cluster-details.module#ClusterDetailsModule' },
      { path: 'members', loadChildren: '../members/members.module#MembersModule' },
      { path: 'members/:member_id', loadChildren: '../member-details/member-details.module#MemberDetailsModule' },
      { path: 'events', loadChildren: '../events/events.module#EventsModule' },
      { path: 'events/:churchevents_id', loadChildren: '../event-details/event-details.module#EventDetailsModule' },
      { path: 'members/:member-id', loadChildren: '../member-details/member-details.module#MemberDetailsModule' },
      { path: 'groups/:churchgroups_id', loadChildren: '../group-details/group-details.module#GroupDetailsModule' }
    ],
    canActivate: [AuthGuard],

  }
  ,
  {
    path: '',
    component: NoDashComponent,
    children: [
      { path: 'login', loadChildren: '../login/login.module#LoginModule' },
      // { path: 'register', loadChildren: '../register/register.module#RegisterModule' },
      // {path: 'Register', loadChildren: '../register/register.module#RegisterModule'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
