import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupDetailsRoutingModule } from './group-details-routing.module';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupEventsComponent } from './group-events/group-events.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [GroupDetailsComponent, GroupEventsComponent],
  imports: [
    CommonModule,
    GroupDetailsRoutingModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class GroupDetailsModule { }
