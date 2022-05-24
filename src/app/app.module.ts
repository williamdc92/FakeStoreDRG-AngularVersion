import { ProductsEffect } from './store/products/products.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {StoreRouterConnectingModule} from '@ngrx/router-store';
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


import { AuthguardService } from './core/guards/authguard.service';
import {IsAdminGuardService} from '../app/core/guards/is-admin-guard.service'
import { InterceptorService } from '../app/core/interceptor/interceptor.service';

import { FooterComponent } from './navigation-components/footer/footer.component';
import { NavbarComponent } from './navigation-components/navbar/navbar.component';


import { PagenotfoundComponent } from '../app/core/pages/pagenotfound/pagenotfound.component';
import { ForbiddenComponent } from '../app/core/pages/forbidden/forbidden.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { InterceptorAuthService } from './core/interceptor/interceptor-auth.service';



import { SpinnerComponent } from './core/utils/spinner/spinner.component';
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
    FooterComponent,
    PagenotfoundComponent,
    ForbiddenComponent,
    NavbarComponent,
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
