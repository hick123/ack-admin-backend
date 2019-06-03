import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivateMemberRoutingModule } from './activate-member-routing.module';
import { ActivateMemberComponent } from './activate-member/activate-member.component';

@NgModule({
  declarations: [ActivateMemberComponent],
  imports: [
    CommonModule,
    ActivateMemberRoutingModule
  ]
})
export class ActivateMemberModule { }
