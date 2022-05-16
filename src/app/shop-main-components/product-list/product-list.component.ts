import { RootObject } from './../../providers/shop.service';
import { Component, Input, OnInit } from '@angular/core';
import { ShopService } from 'src/app/providers/shop.service';
import { AuthService } from 'src/app/providers/auth.service';
import { Router } from '@angular/router';
import { CartElement, UserService } from 'src/app/providers/user.service';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionsContainer } from 'src/app/subscription-container';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() result : RootObject[] | undefined
  subs = new SubscriptionsContainer;
  cart: CartElement[] = [];

  constructor(public shop: ShopService, public auth: AuthService, private router: Router, public user: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.getUserCart();
    }
  }

  
  getUserCart() {
    this.subs.add = this.user.getCart(this.auth.analyzeToken!.user_id).subscribe({
      next: (cart) => {
        this.cart = cart;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addInCart(idproduct: string): void {

    this.subs.add = this.user.addProductInCart(this.auth.analyzeToken!.user_id, idproduct, localStorage.getItem('token')).subscribe({
      next: () => {
        this.getUserCart();
        this.toastr.success('Product added in cart!', 'Success', {
          positionClass: "toast-bottom-left"
        });
      },
      error: () => {

        this.toastr.warning('Cannot add product', 'Error', {
          positionClass: "toast-bottom-left"
        });
      }
    })
  }


  removeElement = (idp: string | null) => {
    this.subs.add = this.user.removeProductFromCart((this.auth.analyzeToken!.user_id), idp).subscribe({
      next: () => {
        this.toastr.warning('Product removed successfully', 'Success', {
          positionClass: "toast-bottom-left"
        });
        this.getUserCart();
      },
      error: () => {
        this.toastr.warning('Cannot remove product', 'Error', {
          positionClass: "toast-bottom-left"
        });
      }
    })
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


}
