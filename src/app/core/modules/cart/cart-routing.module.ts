import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from '../../guards/authguard.service';
import { CartComponent } from './cart.component';

const routes: Routes = [
  { 
    path:'',
    component: CartComponent,
    canActivate : [AuthguardService]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
