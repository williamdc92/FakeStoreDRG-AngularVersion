import { ProductsEffect } from './store/products/products.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
  StoreRouterConnectingModule} from '@ngrx/router-store';




import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';"@angular/forms";
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 

import { AuthComponent } from './auth/auth.component';
import { AuthguardService } from './providers/guards/authguard.service';
import {IsAdminGuardService} from './providers/guards/is-admin-guard.service';
import { InterceptorService } from './providers/loader/interceptor.service';

import { FooterComponent } from './navigation-components/footer/footer.component';
import { NavbarComponent } from './navigation-components/navbar/navbar.component';

import { HomeComponent } from './shop-main-components/home/home.component';
import { CategoryComponent } from './shop-main-components/category/category.component';
import { ProducerComponent } from './shop-main-components/producer/producer.component';
import { ProductDetailComponent } from './shop-main-components/product-detail/product-detail.component';

import { CartComponent } from './user-components/cart/cart.component';
import { OrderHistoryComponent } from './user-components/order-history/order-history.component';
import { OrderDetailComponent } from './user-components/order-history/order-detail/order-detail.component';


import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { InterceptorAuthService } from './providers/loader/interceptor-auth.service';
import { FormatErrorPipe } from './pipes/format-error.pipe';
import { FormErrorManagerComponent } from './auth/form-error-manager/form-error-manager.component';
import { SingleProductComponent } from './shop-main-components/single-product/single-product.component';
import { SingleCartElementComponent } from './user-components/cart/single-cart-element/single-cart-element.component';
import { ProductListComponent } from './shop-main-components/product-list/product-list.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { environment } from 'src/environments/environment';
import { productsReducer, singleProductReducer } from './store/products/products.reducer';
import {usersReducer } from './store/users/users.reducer';
import { UsersEffect } from './store/users/users.effects';
import { currentuserReducer } from './store/currentUser/currentuser.reducer';
import { currentuserEffect } from './store/currentUser/currentuser.effects';
import { FiltersEffect } from './store/filters';







@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    ProducerComponent,
    CategoryComponent,
    AuthComponent,
    PagenotfoundComponent,
    ForbiddenComponent,
    CartComponent,
    OrderHistoryComponent,
    NavbarComponent,
    ProductDetailComponent,
    OrderDetailComponent,
    FormatErrorPipe,
    FormErrorManagerComponent,
    SingleProductComponent,
    SingleCartElementComponent,
    ProductListComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({products : productsReducer, currentUser : currentuserReducer, product_detail : singleProductReducer, users : usersReducer, }),
    EffectsModule.forRoot([ProductsEffect, UsersEffect, currentuserEffect, FiltersEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [AuthguardService,IsAdminGuardService, {provide: HTTP_INTERCEPTORS,useClass:InterceptorService, multi:true},{provide: HTTP_INTERCEPTORS,useClass:InterceptorAuthService, multi:true}, { provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
