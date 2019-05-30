import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClusterDetailsRoutingModule } from './cluster-details-routing.module';
import { ClusterDetailsComponent } from './cluster-details/cluster-details.component';
import { TabsModule,BsDatepickerModule  } from 'ngx-bootstrap';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ClusterDetailsComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,ReactiveFormsModule,
    ClusterDetailsRoutingModule
  ]
})
export class ClusterDetailsModule { }
