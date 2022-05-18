import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { EditDbComponent } from './admin-components/edit-db/edit-db.component';
import { GrantPComponent } from './admin-components/grant-p/grant-p.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    GrantPComponent,
    EditDbComponent,
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ]
})
export class AdminsModule { }
