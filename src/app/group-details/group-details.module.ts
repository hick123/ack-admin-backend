import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupDetailsRoutingModule } from './group-details-routing.module';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupEventsComponent } from './group-events/group-events.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { TabsModule,BsDatepickerModule  } from 'ngx-bootstrap';
import {MatDatepickerModule,MatFormFieldModule,MatNativeDateModule } from '@angular/material';


@NgModule({
  declarations: [GroupDetailsComponent, GroupEventsComponent],
  imports: [
    CommonModule,
    GroupDetailsRoutingModule,
    FormsModule,ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    TabsModule.forRoot(),
    MatFormFieldModule,
    BsDatepickerModule.forRoot()
  ]
})
export class GroupDetailsModule { }
