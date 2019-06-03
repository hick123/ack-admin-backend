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
import { MatFormFieldModule, MatInputModule,MatToolbarModule,MatProgressSpinnerModule,MatCardModule } from '@angular/material';




@NgModule({
  declarations: [ClusterDetailsComponent, ClusterMembersComponent, ClusterEventsComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,ReactiveFormsModule,
    ClusterDetailsRoutingModule,
    MatFormFieldModule,
     MatInputModule,
     MatToolbarModule,
     MatProgressSpinnerModule,
     MatCardModule,
     MatTableModule,
     MatPaginatorModule
  ]
})
export class ClusterDetailsModule { }
