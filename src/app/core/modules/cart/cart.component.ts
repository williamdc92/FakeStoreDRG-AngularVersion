
import { SubscriptionsContainer } from '../../utils/unsubscriber/subscription-container';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/providers/auth.service';
import { UserService, CartElement, orders } from 'src/app/core/providers/user.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, finalize, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { addUserOrder, clearCart, getUserCart, manageUserCart } from 'src/app/store/currentUser/currentuser.action';
import { UserCart } from 'src/app/store/currentUser/currentuser.selector';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {


  cart$: BehaviorSubject<CartElement[]> = new BehaviorSubject<CartElement[]>([]);
  total$: Observable<number> = new Observable;
  destroy$ = new BehaviorSubject(true);

  constructor(
    public user: UserService, 
    public auth: AuthService, 
    private store: Store<AppState>) { }

  ngOnDestroy(): void {
  
  }

  ngOnInit(): void {
    this.getCart().subscribe();
    this.total$ = this.getTotal();
  }

  getCart() : Observable<CartElement[] | undefined> {
    return this.store.select(UserCart).pipe(
      tap(items => {
        items && this.cart$.next(items)
      })
    );
  } 

  getTotal() : Observable<number> {
    return this.cart$.pipe(
      map(item => item.map(item => item.tot).reduce((sum, item) => sum + item, 0))
      )
  }

  increaseCart = (idproduct: string | null) => {
    this.store.dispatch(manageUserCart({request$:this.user.increaseInCart(idproduct), successMsg:"Product Increased!", errorMsg:"Can't add product..."  }));
  }

  decreaseCart = (idproduct: string | null) => {
    this.store.dispatch(manageUserCart({request$:this.user.decreaseInCart(idproduct), successMsg:"Product Decreased!", errorMsg:"Can't remove product..."  }))

  }

  removeElement = (idproduct: string | null) => {
    this.store.dispatch(manageUserCart({request$:this.user.removeProductFromCart(idproduct), successMsg:"Product Removed!", errorMsg:"Can't remove product..."  }))
  }

  placeOrder = () => {
    this.store.dispatch(addUserOrder());
  }

 


}
