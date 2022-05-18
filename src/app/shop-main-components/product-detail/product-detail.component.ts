import { SubscriptionsContainer } from './../../subscription-container';
import { Valutation } from './../../providers/shop.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { catchError, Observable, of, Subscription, switchMap, take, tap } from 'rxjs';
import { ShopService, RootObject } from 'src/app/providers/shop.service';
import { AuthService } from 'src/app/providers/auth.service';
import { CartElement, Product, UserService } from 'src/app/providers/user.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  id: string = "";
  valutation: undefined | number;
  length: number = 0;
  isError: boolean = false;
  cart: CartElement[] = [];

  product: RootObject | undefined;
  request$: Observable<CartElement[]> = new Observable

  currentValutation: Valutation = {
    nickname: this.auth.analyzeToken?.email,
    star: 0,
    comment: "",
  };



  constructor(public user: UserService, public shop: ShopService, private route: ActivatedRoute, private router: Router, public auth: AuthService, public toastr: ToastrService) {

    this.router.events.pipe(
      tap((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0)
      }),
      take(1)
    ).subscribe();

    route.params.pipe(
      tap((params) => {
        this.id = params['id'];
      }),
      switchMap(() => {
        return this.getProductData();
      }),
      take(1)
    ).subscribe();

  }

  getProductData(): Observable<RootObject | void[]> {
    return this.shop.getProductById(this.id).pipe(
      tap((product) => {
        this.product = product;
        this.length = this.product.valutations.length;
        this.valutation = product.valutations.map(valutation => valutation.star).reduce((sum, valutation) => sum + valutation, 0) / this.length;
      }),
      catchError((error: any) => {
        console.log(error);
        return of([]);
      }),
      take(1));
  }

  ngOnInit(): void {
    if (localStorage.getItem('isLogged') === 'true') { this.getUserCart().subscribe(); }
  }

  addReview = () => {
    this.user.addValutation(this.id, this.currentValutation, (localStorage.getItem('token'))).pipe(
      tap(() => {
        this.toastr.success('Valutation added, thanks!', 'Success', {
          positionClass: "toast-bottom-left"
        });
      }),
      catchError((error) => {
        this.toastr.error('cannot send valutation, please try again!', 'Error', {
          positionClass: "toast-bottom-left"
        });
        return of([]);
      }),
      switchMap(() => {
        return this.getProductData()
      }),
      take(1)
    ).subscribe()
  }

  getUserCart(): Observable<CartElement[] | void> {
    return this.user.getCart(this.auth.analyzeToken!.user_id).pipe(
      tap((cart) => this.cart = cart),
      catchError((error) => {
        console.log(error);
        return of([]);
      }),
      take(1));
  }

  addInCart(idproduct: string): void {
   this.sendRequest(this.user.addProductInCart(this.auth.analyzeToken!.user_id, idproduct, localStorage.getItem('token')),"Product Added!","Can't add product...").subscribe();
  }


  removeElement = (idp: string | null) => {
  this.sendRequest( this.user.removeProductFromCart((this.auth.analyzeToken!.user_id), idp),"Product Removed!","Can't remove product from cart...").subscribe();
  }

  
  sendRequest (request$ : Observable<CartElement>, successMsg:string, errorMsg:string) : Observable<CartElement[] | void> {
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

  ngOnDestroy(): void {
  }
}
