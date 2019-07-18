import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule,MatIconModule, MatInputModule,MatToolbarModule,MatProgressSpinnerModule,MatCardModule } from '@angular/material';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashGroupsComponent } from './dash-groups/dash-groups.component';
import { DashClustersComponent } from './dash-clusters/dash-clusters.component';
import { AgGridModule } from 'ag-grid-angular';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [DashboardComponent, DashGroupsComponent, DashClustersComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DataTablesModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    AgGridModule.withComponents([]),
    ChartsModule

    // BrowserAnimationsModule
  ]
})
export class DashboardModule { }
