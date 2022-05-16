import { SubscriptionsContainer } from './../../subscription-container';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { UserService, CartElement, orders } from 'src/app/providers/user.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cart: CartElement[] = [];
  cart$: Observable<CartElement[]> = new Observable;
  subs = new SubscriptionsContainer;
  total$: Observable<number> = new Observable;

  constructor(public user: UserService, public auth: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart = () => {
    this.cart$ = this.user.getCart(this.auth.analyzeToken!.user_id).pipe(
      catchError((err) => {
        console.log(err);
        return of ([]);
      })
      )

    this.total$ = this.cart$.pipe(map(item => item.map(item => item.tot).reduce((sum, item) => sum + item,0)));

  }

  increaseCart = (idp: string | null) => {
    this.subs.add = this.user.increaseInCart(this.auth.analyzeToken!.user_id, idp).subscribe({
      next: () => {
        this.toastr.success('Quantity increased successfully', 'Success', {
          positionClass: "toast-bottom-left"
        });
        this.getCart();
      },
      error: () => {
        this.toastr.warning('Cannot increase quantity', 'Error', {
          positionClass: "toast-bottom-left"
        });
      }
    })
  }

  decreaseCart = (idp: string | null) => {
    this.subs.add = this.user.decreaseInCart(this.auth.analyzeToken!.user_id, idp).subscribe({
      next: () => {
        this.toastr.success('Quantity decrease successfully', 'Success', {
          positionClass: "toast-bottom-left"
        });
        this.getCart();
      },
      error: () => {
        this.toastr.warning('Cannot decrease quantity', 'Error', {
          positionClass: "toast-bottom-left"
        });
      }
    })
  }

  removeElement = (idp: string | null) => {
    this.subs.add = this.user.removeProductFromCart(this.auth.analyzeToken!.user_id, idp).subscribe({
      next: () => {
        this.toastr.success('Product removed successfully', 'Success', {
          positionClass: "toast-bottom-left"
        });
        this.getCart();
      },
      error: () => {
        this.toastr.warning('Cannot remove product', 'Error', {
          positionClass: "toast-bottom-left"
        });
      }
    })
  }

  placeOrder = () => { 
    

    this.subs.add = this.user.addOrder(this.auth.analyzeToken!.user_id, localStorage.getItem('token')).subscribe({
    next: () => {
      this.toastr.success('Order sent successfully!', 'Success', {
        positionClass: "toast-bottom-left"
      });
      this.getCart();
    },
    error: () => {
      this.toastr.error('Cannot send order, please try again', 'Error', {
        positionClass: "toast-bottom-left"
      });
    }
  })
      
  }

  ngOnDestroy(): void {
      this.subs.dispose();
  }

}
