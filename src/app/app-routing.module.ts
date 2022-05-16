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
import {IsAdminGuardService} from './providers/guards/is-admin-guard.service';
import { GrantPComponent } from './admin-components/grant-p/grant-p.component';
import { EditDbComponent } from './admin-components/edit-db/edit-db.component';
import { OrderDetailComponent } from './user-components/order-history/order-detail/order-detail.component';



const routes: Routes = [
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
    path: 'orders/order/:id',
    component:OrderDetailComponent,
    canActivate : [AuthguardService]
  },

  {
    path:'grant_permissions',
    component:GrantPComponent,
    canActivate : [AuthguardService,IsAdminGuardService]
  },

  {
    path: 'edit_db',
    component:EditDbComponent,
    canActivate : [AuthguardService,IsAdminGuardService]
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
