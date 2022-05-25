import { AgGridModule } from 'ag-grid-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { EditDbComponent } from './pages/edit-db/edit-db.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GrantPComponent } from './pages/grant-p/grant-p.component';
import { CellCustomButtonComponent } from './components/cell-custom-button/cell-custom-button.component';
import { CellCustomButtonAdminsComponent } from './components/cell-custom-button-admins/cell-custom-button-admins.component';



@NgModule({
  declarations: [
    GrantPComponent,
    EditDbComponent,
    CellCustomButtonComponent,
    CellCustomButtonAdminsComponent,
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    ReactiveFormsModule,
    AgGridModule,
    MatProgressSpinnerModule,
  ]
})
export class AdminsModule { }
