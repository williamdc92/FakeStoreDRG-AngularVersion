import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from '../../guards/authguard.service';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderHistoryComponent } from './components/orders-history/order-history.component';


const routes: Routes = [
  {
    path: '',
    component: OrderHistoryComponent,
    canActivate : [AuthguardService]
  },
  {
    path: 'order/:ido',
    component : OrderDetailComponent,
    canActivate : [AuthguardService]
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
