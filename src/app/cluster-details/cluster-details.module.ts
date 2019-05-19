import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClusterDetailsRoutingModule } from './cluster-details-routing.module';
import { ClusterDetailsComponent } from './cluster-details/cluster-details.component';

@NgModule({
  declarations: [ClusterDetailsComponent],
  imports: [
    CommonModule,
    ClusterDetailsRoutingModule
  ]
})
export class ClusterDetailsModule { }
