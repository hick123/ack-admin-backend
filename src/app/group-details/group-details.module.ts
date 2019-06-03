import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupDetailsRoutingModule } from './group-details-routing.module';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupEventsComponent } from './group-events/group-events.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { TabsModule,BsDatepickerModule  } from 'ngx-bootstrap';
import {MatDatepickerModule,MatNativeDateModule } from '@angular/material';
import { GroupMembersComponent } from './group-members/group-members.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule,MatToolbarModule,MatProgressSpinnerModule,MatCardModule } from '@angular/material';


@NgModule({
  declarations: [GroupDetailsComponent, GroupEventsComponent, GroupMembersComponent],
  imports: [
    CommonModule,
    GroupDetailsRoutingModule,
    FormsModule,ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    TabsModule.forRoot(),
    MatFormFieldModule,
    BsDatepickerModule.forRoot(),
    MatInputModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCardModule,MatPaginatorModule,
    MatTableModule
  ]
})
export class GroupDetailsModule { }
