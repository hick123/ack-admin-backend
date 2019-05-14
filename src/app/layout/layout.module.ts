import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { AsidenavbarComponent } from './asidenavbar/asidenavbar.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

import { FooternavbarComponent } from './footernavbar/footernavbar.component';
import { SettingsnavbarComponent } from './settingsnavbar/settingsnavbar.component';
import { TopnavbarComponent } from './topnavbar/topnavbar.component';
import { NoDashComponent } from './no-dash/no-dash.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AsidenavbarComponent, 
    FooternavbarComponent,
     SettingsnavbarComponent,
      TopnavbarComponent, 
      NoDashComponent,
      MainLayoutComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutRoutingModule,
    // LayoutModule
  ],
  exports:[]
  
})
export class LayoutModule { }
