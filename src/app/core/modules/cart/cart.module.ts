
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { SingleCartElementComponent } from './components/single-cart-element/single-cart-element.component';


@NgModule({
  declarations: [
    CartComponent,
    SingleCartElementComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
