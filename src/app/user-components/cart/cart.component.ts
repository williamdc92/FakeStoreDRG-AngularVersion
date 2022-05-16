import { SubscriptionsContainer } from './../../subscription-container';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { UserService, CartElement, orders } from 'src/app/providers/user.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, finalize, map, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {


  cart$: BehaviorSubject<CartElement[]> = new BehaviorSubject<CartElement[]>([]);
  total$: Observable<number> = new Observable;

  constructor(public user: UserService, public auth: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCart().subscribe();
    this.total$ = this.getTotal();
  }

  getCart() : Observable<CartElement[]> {
    return this.user.getCart(this.auth.analyzeToken!.user_id).pipe(
      catchError((err) => {
        console.log(err);
        return of([]);
      }),
      tap(items => this.cart$.next(items)),
      take(1)
    )
  }

  getTotal() : Observable<number> {
    return this.cart$.pipe(
      map(item => item.map(item => item.tot).reduce((sum, item) => sum + item, 0))
      )
  }

  increaseCart = (idp: string | null) => {
    this.user.increaseInCart(this.auth.analyzeToken!.user_id, idp).pipe(
      tap(() => {
        this.toastr.success('Quantity increased successfully', 'Success', {
          positionClass: "toast-bottom-left"
        });
      }),
      catchError((err) => {
        this.toastr.warning('Cannot increase quantity', 'Error', {
          positionClass: "toast-bottom-left"
        });
        console.log(err);
        return of([]);
      }),
      switchMap(() => {
        return this.getCart();
      }),
      take(1)
    ).subscribe();
  }


  decreaseCart = (idp: string | null) => {
    this.user.decreaseInCart(this.auth.analyzeToken!.user_id, idp).pipe(
      tap(() => {
        this.toastr.success('Product removed successfully', 'Success', {
          positionClass: "toast-bottom-left"
        });
      }),
      catchError((err) => {
        this.toastr.warning('Cannot remove product', 'Error', {
          positionClass: "toast-bottom-left"
        });
        return of([])
      }),
      switchMap(() => {
        return this.getCart();
      }),
      take(1)
    ).subscribe();
  }


  removeElement = (idp: string | null) => {
    this.user.removeProductFromCart(this.auth.analyzeToken!.user_id, idp).pipe(
      tap(() => {
        this.toastr.success('Product removed successfully', 'Success', {
          positionClass: "toast-bottom-left"
        });
      }),
      catchError(() => {
        this.toastr.warning('Cannot remove product', 'Error', {
          positionClass: "toast-bottom-left"
        });
        return of([])
      }),
      switchMap(() => {
        return this.getCart();
      }),
      take(1),
    ).subscribe();
  }

  placeOrder = () => {
    this.user.addOrder(this.auth.analyzeToken!.user_id, localStorage.getItem('token')).pipe(
      tap(() => {
        this.toastr.success('Order sent successfully!', 'Success', {
          positionClass: "toast-bottom-left"
        });
      }),
      catchError(() => {
        this.toastr.error('Cannot send order, please try again', 'Error', {
          positionClass: "toast-bottom-left"
        });
        return of([]);
      }),
      switchMap(() => {
        return this.getCart();
      }),
      take(1)
    ).subscribe()
  }

  ngOnDestroy(): void {
  }

}
