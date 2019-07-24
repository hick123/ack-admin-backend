import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LayoutModule} from './layout/layout.module';
import {PreloadAllModules, RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// import { AddMembersComponent } from './group-details/add-members/add-members.component';
// import { GroupDetailsModule } from "./group-details/group-details.module";




@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // GroupDetailsModule,
    RouterModule.forRoot([]),
        // RouterModule.forRoot([], { preloadingStrategy: PreloadAllModules }),
    // AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule
  ],
  providers: [],
  // entryComponents:[AddMembersComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
