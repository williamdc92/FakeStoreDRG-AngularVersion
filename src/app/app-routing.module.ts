import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shop-main-components/home/home.component';
import {ProducerComponent} from './shop-main-components/producer/producer.component';
import {CategoryComponent} from './/shop-main-components/category/category.component'
import { ProductDetailComponent } from './shop-main-components/product-detail/product-detail.component';
import { AuthComponent } from './auth/auth.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { CartComponent } from './user-components/cart/cart.component';
import { OrderHistoryComponent } from './user-components/order-history/order-history.component';
import { AuthguardService } from './providers/guards/authguard.service';
import { OrderDetailComponent } from './user-components/order-history/order-detail/order-detail.component';



const routes: Routes = [

  { path: 'admins', loadChildren: () => import('./admins/admins.module').then(m => m.AdminsModule) },

  {
  path:'',
  redirectTo: 'products',
  pathMatch: 'full'
  },

  {
    path:'products',
    component: HomeComponent
  },

  {
    path:'products/producer/:producer',
    component: ProducerComponent
  },

  {
    path: 'products/category/:category',
    component: CategoryComponent
  },

  {
    path:'products/product/:id',
    component :ProductDetailComponent
  },

  {
    path:'auth',
    component: AuthComponent
  },

  {
    path:'cart',
    component: CartComponent,
    canActivate : [AuthguardService]
  },

  {
    path:'orders',
    component:OrderHistoryComponent,
    canActivate : [AuthguardService]
  },

  {
    path: 'orders/order/:ido',
    component:OrderDetailComponent,
    canActivate : [AuthguardService]
  },

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
