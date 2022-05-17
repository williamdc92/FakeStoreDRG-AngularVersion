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
export class CartComponent implements OnInit {


  cart$: BehaviorSubject<CartElement[]> = new BehaviorSubject<CartElement[]>([]);
  total$: Observable<number> = new Observable;
  request$: Observable<CartElement[] | orders> = new Observable;

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
   this.sendRequest(this.user.increaseInCart(this.auth.analyzeToken!.user_id, idp)).subscribe();
  }

  decreaseCart = (idp: string | null) => {
    this.sendRequest(this.user.decreaseInCart(this.auth.analyzeToken!.user_id, idp)).subscribe();
  }

  removeElement = (idp: string | null) => {
    this.sendRequest(this.user.removeProductFromCart(this.auth.analyzeToken!.user_id, idp)).subscribe();
  }

  placeOrder = () => {
    this.sendRequest(this.user.addOrder(this.auth.analyzeToken!.user_id, localStorage.getItem('token'))).subscribe();
  }

  sendRequest (request$ : Observable<CartElement | orders>) : Observable<CartElement[] | orders> {
    return request$.pipe(
      tap(() => {
        this.toastr.success('Done', 'Success', {
          positionClass: "toast-bottom-left"
        });
      }),
      catchError(() => {
        this.toastr.warning('Operation failed', 'Error', {
          positionClass: "toast-bottom-left"
        });
        return of([])
      }),
      switchMap(() => {
        return this.getCart();
      }),
      take(1)
    )
  }


}
