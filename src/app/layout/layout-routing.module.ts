import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NoDashComponent } from './no-dash/no-dash.component';

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
      // { path: 'account-settings', loadChildren: '../account-settings/account-settings.module#AccountSettingsModule' },
    ]
  }
  ,
  {
    path: '',
    component: NoDashComponent,
    children: [
      { path: 'login', loadChildren: '../login/login.module#LoginModule' },
      { path: 'register', loadChildren: '../register/register.module#RegisterModule' }
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
