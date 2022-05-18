import { RootObject } from './../../providers/shop.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from 'src/app/providers/shop.service';
import { AuthService } from 'src/app/providers/auth.service';
import { Router } from '@angular/router';
import { CartElement, UserService } from 'src/app/providers/user.service';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionsContainer } from 'src/app/subscription-container';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {


  @Input() result: RootObject[] | undefined
  subs = new SubscriptionsContainer;
  cart: CartElement[] = [];
  request$: Observable<CartElement[]> = new Observable



  constructor(public shop: ShopService, public auth: AuthService, private router: Router, public user: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.getUserCart().subscribe();
    }
  }

  ngOnDestroy(): void {
 
  }



  getUserCart(): Observable<CartElement[] | void> {
    return this.user.getCart(this.auth.analyzeToken!.user_id).pipe(
      tap((cart) => this.cart = cart),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
      , take(1));
  }

  addInCart(idproduct: string): void {
  this.sendRequest( this.user.addProductInCart(this.auth.analyzeToken!.user_id, idproduct, localStorage.getItem('token')),"Product Added!","Can't add product...").subscribe();
  }


  removeElement = (idp: string | null) => {
    this.sendRequest(this.user.removeProductFromCart((this.auth.analyzeToken!.user_id), idp), "Product Removed!","Can't remove product from cart...").subscribe();
  }

  isInCart = (idp: string) => {
    if (localStorage.getItem('token')) {
      if (this.cart.some(p => p.product.id === idp)) {
        return true;
      } else {
        return false;
      }
    } else {
      return null;
    }
  }

  sendRequest (request$ : Observable<CartElement>, successMsg : string, errorMsg : string) : Observable<CartElement[] | void> {
    return request$.pipe(
      tap(() => {
        this.toastr.success(`${successMsg}`, 'Success', {
          positionClass: "toast-bottom-left"
        });
      }),
      catchError(() => {
        this.toastr.warning(`${errorMsg}`, 'Error', {
          positionClass: "toast-bottom-left"
        });
        return of([])
      }),
      switchMap(() => {
        return this.getUserCart();
      }),
      take(1)
    )
  }




}
