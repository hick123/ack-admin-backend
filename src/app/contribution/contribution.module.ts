import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributionRoutingModule } from './contribution-routing.module';
import { AddContributionComponent } from './add-contribution/add-contribution.component';
import { ContributionListComponent } from './contribution-list/contribution-list.component';
import { MatToolbarModule, MatGridListModule, MatFormFieldModule, MatInputModule,  MatRadioModule,
  MatSelectModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatSnackBarModule,
  MatTableModule,
  MatIconModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule, } from '@angular/material';
  import { TabsModule,BsDatepickerModule  } from 'ngx-bootstrap';
  import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { TransactionsComponent } from './transactions/transactions.component';


@NgModule({
  declarations: [AddContributionComponent, ContributionListComponent, TransactionsComponent],
  imports: [
    CommonModule,
    ContributionRoutingModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ContributionModule { }
