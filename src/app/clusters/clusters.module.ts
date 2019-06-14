import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClustersRoutingModule } from './clusters-routing.module';
import { ClustersComponent } from './clusters/clusters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { MatPaginatorModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule,MatSelectModule,MatIconModule, MatInputModule,MatToolbarModule,MatProgressSpinnerModule,MatCardModule } from '@angular/material';



@NgModule({
  declarations: [ClustersComponent],
  imports: [
    CommonModule,
    ClustersRoutingModule,
    FormsModule, ReactiveFormsModule ,
    HttpClientModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,MatIconModule

  ]
})
export class ClustersModule { }
