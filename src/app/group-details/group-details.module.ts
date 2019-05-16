import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupDetailsRoutingModule } from './group-details-routing.module';
import { GroupDetailsComponent } from './group-details/group-details.component';

@NgModule({
  declarations: [GroupDetailsComponent],
  imports: [
    CommonModule,
    GroupDetailsRoutingModule
  ]
})
export class GroupDetailsModule { }
