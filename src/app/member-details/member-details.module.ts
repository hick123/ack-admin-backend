import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberDetailsRoutingModule } from './member-details-routing.module';
import { MemberDetailsComponent } from './member-details/member-details.component';

@NgModule({
  declarations: [MemberDetailsComponent],
  imports: [
    CommonModule,
    MemberDetailsRoutingModule
  ]
})
export class MemberDetailsModule { }
