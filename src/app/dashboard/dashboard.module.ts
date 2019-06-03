import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule,MatIconModule, MatInputModule,MatToolbarModule,MatProgressSpinnerModule,MatCardModule } from '@angular/material';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 




// import { MaterialModule } from '../../';



import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashGroupsComponent } from './dash-groups/dash-groups.component';
import { DashClustersComponent } from './dash-clusters/dash-clusters.component';

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
    MatIconModule
    // BrowserAnimationsModule
  ]
})
export class DashboardModule { }
