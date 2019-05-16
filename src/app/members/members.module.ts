import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members/members.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import {DataTableModule} from "angular-6-datatable";


@NgModule({
  declarations: [MembersComponent, MemberDetailsComponent],
  imports: [
    CommonModule,
    MembersRoutingModule,
    DataTableModule

  ]
})
export class MembersModule { }
