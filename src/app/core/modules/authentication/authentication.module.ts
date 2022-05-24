import { FormErrorManagerComponent } from './../../utils/form-error-manager/form-error-manager.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormatErrorPipe } from '../../pipes/format-error.pipe';


@NgModule({
  declarations: [
    AuthenticationComponent,
    FormErrorManagerComponent,
    FormatErrorPipe,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,

    
  ]
})
export class AuthenticationModule { }
