import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups/groups.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material'
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    FormsModule,ReactiveFormsModule,
    NgxDatatableModule,
    NgSelectModule,
    Ng2SearchPipeModule,
    MatPaginatorModule,
    MatFormFieldModule, 
    MatInputModule,
    MatTableModule
  ]
})
export class GroupsModule { }
