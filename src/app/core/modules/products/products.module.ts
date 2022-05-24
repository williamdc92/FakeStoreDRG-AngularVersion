import { CategoryComponent } from './pages/category/category.component'

import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { SingleProductComponent } from './components/single-product/single-product.component'
import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProducerComponent } from './pages/producer/producer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AuthguardService } from '../../guards/authguard.service';
import { IsAdminGuardService } from '../../guards/is-admin-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../../interceptor/interceptor.service';
import { InterceptorAuthService } from '../../interceptor/interceptor-auth.service';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    SingleProductComponent,
    ProductDetailComponent,
    ProducerComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    StoreRouterConnectingModule.forRoot()

  ],
})
export class ProductsModule { }
