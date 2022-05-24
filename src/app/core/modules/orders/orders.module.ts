import { RouterModule } from '@angular/router';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderHistoryComponent } from './components/orders-history/order-history.component';
import { NgModule, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';



@NgModule({
  declarations: [
    OrderHistoryComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    RouterModule
  ]
})
export class OrdersModule {

  constructor(

  ) {console.log("test")}


  
 }
