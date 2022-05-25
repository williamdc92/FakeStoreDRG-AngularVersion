import { RouterModule } from '@angular/router';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderHistoryComponent } from './components/orders-history/order-history.component';
import { NgModule, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';


import { OrdersRoutingModule } from './orders-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AngularEmojisModule } from 'angular-emojis';




@NgModule({
  declarations: [
    OrderHistoryComponent,
    OrderDetailComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    RouterModule,
    AgGridModule,
    AngularEmojisModule 
    
  ],

})
export class OrdersModule { }
