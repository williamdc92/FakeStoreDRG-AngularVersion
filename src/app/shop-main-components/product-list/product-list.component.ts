import { clearCart, getUserOrders, manageUserCart } from '../../store/currentUser/currentuser.action';
import { RootObject } from './../../providers/shop.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from 'src/app/providers/shop.service';
import { AuthService } from 'src/app/providers/auth.service';
import { Router } from '@angular/router';
import { CartElement, UserService } from 'src/app/providers/user.service';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionsContainer } from 'src/app/subscription-container';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getUserCart } from 'src/app/store/currentUser/currentuser.action';
import { selectUser, UserCart, UserOrders, UserState } from 'src/app/store/currentUser/currentuser.selector';
import { hasLoaded } from 'src/app/store/products/products.selector';
import { CurrentUserState } from 'src/app/store/currentUser/currentuser.reducer';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {


  @Input() result: RootObject[] | undefined
  subs = new SubscriptionsContainer;
  cart: CartElement[] | undefined = [];
  cart$: Observable<CartElement[] | undefined> | undefined;
  request$: Observable<CartElement[]> = new Observable



  constructor(
    public shop: ShopService, 
    public auth: AuthService, 
    private router: Router, 
    public user: UserService, 
    private toastr: ToastrService,
    private store: Store<AppState>) { 
    }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.store.dispatch(getUserCart())
     this.getData().subscribe();
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearCart());
  }


  getData() : Observable<CartElement [] | undefined>   {

    return this.store.select(UserCart).pipe(
        tap((value)=> this.cart=value)
    );

  }


  addInCart(idproduct: string): void {
  this.store.dispatch(manageUserCart({request$:this.user.addProductInCart(idproduct), successMsg:"Product Added!", errorMsg:"Can't add product..."  }));
  }


  removeElement = (idproduct: string | null) => {

    this.store.dispatch(manageUserCart({request$:this.user.removeProductFromCart(idproduct), successMsg:"Product Removed!", errorMsg:"Can't remove product..."  }))

  }

  isInCart = (idp: string) => {
    if (localStorage.getItem('token')) {
      if (this.cart?.some(p => p.product.id === idp)) {
        return true;
      } else {
        return false;
      }
    } else {
      return null;
    }
  }
}
