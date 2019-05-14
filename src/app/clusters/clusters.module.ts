import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClustersRoutingModule } from './clusters-routing.module';
import { ClustersComponent } from './clusters/clusters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 



@NgModule({
  declarations: [ClustersComponent],
  imports: [
    CommonModule,
    ClustersRoutingModule,
    FormsModule, ReactiveFormsModule ,
    HttpClientModule
  ]
})
export class ClustersModule { }
