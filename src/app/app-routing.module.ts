import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from '../app/core/pages/pagenotfound/pagenotfound.component';
import { ForbiddenComponent } from '../app/core/pages/forbidden/forbidden.component';

import { AuthguardService } from './core/guards/authguard.service';




const routes: Routes = [

  {
    path:'',
    redirectTo: 'products',
    pathMatch: 'full'
    },

//admins

{ path: 'admins', loadChildren: () => import('./core/modules/admin/admins.module').then(m => m.AdminsModule) },

  
//products

 { path: 'products', loadChildren: () => import('./core/modules/products/products.module').then(m => m.ProductsModule) },

//cart

 { path: 'cart', loadChildren: () => import('./core/modules/cart/cart.module').then(m => m.CartModule) },

 //auth

 { path: 'auth', loadChildren: () => import('./core/modules/authentication/authentication.module').then(m => m.AuthenticationModule) },

  //pages

  {
    path:'forbidden',
    component: ForbiddenComponent
  },

  { path: 'orders', loadChildren: () => import('./core/modules/orders/orders.module').then(m => m.OrdersModule) },



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
