import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberDetailsRoutingModule } from './member-details-routing.module';
import { MemberDetailsComponent } from './member-details/member-details.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule,    MatIconModule,  MatInputModule,MatToolbarModule,MatProgressSpinnerModule,MatCardModule } from '@angular/material';

import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { TabsModule,BsDatepickerModule  } from 'ngx-bootstrap';



@NgModule({
  declarations: [MemberDetailsComponent, MemberEditComponent],
  imports: [
    CommonModule,
    MemberDetailsRoutingModule,
    FormsModule,ReactiveFormsModule,
    MatFormFieldModule,  
      MatIconModule, 
       MatInputModule,
       MatToolbarModule,
       MatProgressSpinnerModule,
       MatCardModule,
       MatTableModule,
       TabsModule.forRoot()
  ]
})
export class MemberDetailsModule { }
