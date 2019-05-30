import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register/register.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,MatCheckboxModule
  ]
})
export class RegisterModule { }
