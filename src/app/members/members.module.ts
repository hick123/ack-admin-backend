import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members/members.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import {DataTableModule} from "angular-6-datatable";
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material'
import { MatFormFieldModule,    MatIconModule,  MatInputModule,MatToolbarModule,MatProgressSpinnerModule,MatCardModule } from '@angular/material';


@NgModule({
  declarations: [MembersComponent, MemberDetailsComponent],
  imports: [
    CommonModule,
    MembersRoutingModule,
    DataTableModule,
    NgxSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCardModule

  ]
})
export class MembersModule { }
