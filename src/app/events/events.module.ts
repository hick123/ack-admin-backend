import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events/events.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { TabsModule,BsDatepickerModule  } from 'ngx-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { CdkTableModule } from '@angular/cdk/table';


@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    CdkTableModule,
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AgGridModule.withComponents([])
  ]
})
export class EventsModule { }
