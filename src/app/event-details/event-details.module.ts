import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { EventDetailsRoutingModule } from './event-details-routing.module';
import { EventDetailsComponent } from './event-details/event-details.component';
import {MatTableModule} from '@angular/material/table';
import { TabsModule,BsDatepickerModule  } from 'ngx-bootstrap';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule,MatToolbarModule,MatProgressSpinnerModule,MatCardModule } from '@angular/material';


@NgModule({
  declarations: [EventDetailsComponent],
  imports: [
    CommonModule,
    EventDetailsRoutingModule,
    MatFormFieldModule, 
    MatInputModule,MatToolbarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,ReactiveFormsModule
  ]
})
export class EventDetailsModule { }
