

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RootObject, ShopService } from 'src/app/core/providers/shop.service';
import { AuthService } from 'src/app/core/providers/auth.service';
import { Router } from '@angular/router';
import { CartElement, UserService } from 'src/app/core/providers/user.service';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionsContainer } from 'src/app/core/utils/unsubscriber/subscription-container';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { clearCart, getUserCart, manageUserCart } from 'src/app/store/currentUser/currentuser.action';
import { UserCart } from 'src/app/store/currentUser/currentuser.selector';

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
