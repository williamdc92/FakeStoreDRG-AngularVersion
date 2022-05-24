import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from '../app/core/pages/pagenotfound/pagenotfound.component';
import { ForbiddenComponent } from '../app/core/pages/forbidden/forbidden.component';

import { AuthguardService } from './core/guards/authguard.service';
import { DispatcherService } from './core/guards/dispatcher.service';




const routes: Routes = [

  {
    path:'',
    redirectTo: 'products',
    pathMatch: 'full'
    },

//admins

{ path: 'admins', 
  canActivate : [DispatcherService],
  canDeactivate : [DispatcherService],
  loadChildren: () => import('./core/modules/admin/admins.module').then(m => m.AdminsModule) },

  
//products

 {path: 'products', 
  canActivate : [DispatcherService],
  canDeactivate : [DispatcherService],
  loadChildren: () => import('./core/modules/products/products.module').then(m => m.ProductsModule) },

//cart

 { path: 'cart',
  canActivate : [DispatcherService],
  canDeactivate : [DispatcherService],
  loadChildren: () => import('./core/modules/cart/cart.module').then(m => m.CartModule) },

 //auth

 { path: 'auth', 
   canActivate : [DispatcherService],
   canDeactivate : [DispatcherService],
   loadChildren: () => import('./core/modules/authentication/authentication.module').then(m => m.AuthenticationModule) },

   //orders 
   
   { path: 'orders', 
   canActivate : [DispatcherService],
   canDeactivate : [DispatcherService],
   loadChildren: () => import('./core/modules/orders/orders.module').then(m => m.OrdersModule) },

  //pages

  {
    path:'forbidden',
    component: ForbiddenComponent
  },

 


  {
    path:'**',
    component: PagenotfoundComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
