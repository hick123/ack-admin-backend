import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventDetailsRoutingModule } from './event-details-routing.module';
import { EventDetailsComponent } from './event-details/event-details.component';

@NgModule({
  declarations: [EventDetailsComponent],
  imports: [
    CommonModule,
    EventDetailsRoutingModule
  ]
})
export class EventDetailsModule { }
