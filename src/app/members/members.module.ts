import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members/members.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import {DataTableModule} from "angular-6-datatable";


@NgModule({
  declarations: [MembersComponent, MemberDetailsComponent],
  imports: [
    CommonModule,
    MembersRoutingModule,
    DataTableModule,
    NgxSpinnerModule

  ]
})
export class MembersModule { }
