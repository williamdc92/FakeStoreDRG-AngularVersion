import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { EditDbComponent } from './pages/edit-db/edit-db.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GrantPComponent } from './pages/grant-p/grant-p.component';



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
