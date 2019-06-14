import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClusterDetailsRoutingModule } from './cluster-details-routing.module';
import { ClusterDetailsComponent } from './cluster-details/cluster-details.component';
import { TabsModule,BsDatepickerModule  } from 'ngx-bootstrap';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ClusterMembersComponent } from './cluster-members/cluster-members.component';
import { ClusterEventsComponent } from './cluster-events/cluster-events.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule,MatSelectModule,MatIconModule, MatInputModule,MatToolbarModule,MatProgressSpinnerModule,MatCardModule } from '@angular/material';
import { AddMembersComponent } from './add-members/add-members.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [ClusterDetailsComponent, ClusterMembersComponent, ClusterEventsComponent, AddMembersComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,ReactiveFormsModule,
    ClusterDetailsRoutingModule,
    MatFormFieldModule,
     MatInputModule,
     MatIconModule,
     MatToolbarModule,
     MatProgressSpinnerModule,
     MatCardModule,
     MatTableModule,
     MatPaginatorModule,
     NgxMatSelectSearchModule,
     MatSelectModule
  ]
})
export class ClusterDetailsModule { }
