import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { catchError, Observable, of, Subscription, switchMap, take, tap } from 'rxjs';
import { ShopService, RootObject, Valutation } from 'src/app/core/providers/shop.service';
import { AuthService } from 'src/app/core/providers/auth.service';
import { CartElement, Product, UserService } from 'src/app/core/providers/user.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { selectAllProducts, selectProductByID } from 'src/app/store/products/products.selector';
import { clearProduct, loadProductById } from 'src/app/store/products/products.actions';
import { UserCart, UserState } from 'src/app/store/currentUser/currentuser.selector';
import { addValutation, clearCart, getUserCart, manageUserCart } from 'src/app/store/currentUser/currentuser.action';



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
  cart: CartElement[] | undefined = [];


  product$: Observable<RootObject | undefined> = new Observable;
  request$: Observable<CartElement[]> = new Observable

  currentValutation: Valutation = {
    nickname: this.auth.analyzeToken?.email,
    star: 0,
    comment: "",
  };

  constructor(
    public user: UserService,
    public shop: ShopService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    public toastr: ToastrService,
    private store: Store<AppState>
  ) {

    this.router.events.pipe( //si chiude con il take(1)
      tap((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0)
      }),
      take(1)
    ).subscribe();


  }


  ngOnInit(): void {


    this.product$ = this.getProductData();

    if (localStorage.getItem('token')) 
    {
      this.store.dispatch(getUserCart())
      this.getUserCart().subscribe();
    }

  }


  getProductData(): Observable<RootObject | undefined> { //si chiude con la pype
    return this.store.select(selectProductByID).pipe(
      tap((product) => {
        if (product) {
          const valutations = product.valutations;
          this.length = valutations.length;
          this.valutation = valutations.map(valutation => valutation.star).reduce((sum, valutation) => sum + valutation, 0) / this.length;
        }
      })
    );
  }

  addReview = () => {
    this.store.dispatch(addValutation({valutation : this.currentValutation}));
  }

  getUserCart(): Observable<CartElement[] | void> { //si chiude con il take(1)
    return this.store.select(UserCart).pipe(
      take(1)
    )
  }

  addInCart(idproduct: string): void {
    this.store.dispatch(manageUserCart({ request$: this.user.addProductInCart(idproduct), successMsg: "Product Added!", errorMsg: "Can't add product..." }));
  }


  removeElement = (idproduct: string | null) => {
    this.store.dispatch(manageUserCart({ request$: this.user.removeProductFromCart(idproduct), successMsg: "Product Removed!", errorMsg: "Can't remove product..." }))
  }


  isInCart = (idp: string) => {
    if (this.cart?.some(p => p.product.id === idp)) {
      return true;
    } else {
      return false;
    }

  }

  ngOnDestroy(): void {
    this.store.dispatch(clearProduct());
    this.store.dispatch(clearCart());
  }
}
