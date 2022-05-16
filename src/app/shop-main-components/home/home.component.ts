import { SpinnerService } from './../../spinner/spinner.service';
import {
  SubscriptionsContainer
} from './../../subscription-container';
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  Router,
  NavigationEnd
} from '@angular/router';
import {
  AuthService
} from 'src/app/providers/auth.service';
import {
  ShopService,
  RootObject,
  Valutation
} from 'src/app/providers/shop.service';
import {
  CartElement,
  Product,
  UserService
} from 'src/app/providers/user.service';
import {
  ToastrService
} from 'ngx-toastr';
import {
  catchError,
  delay,
  finalize,
  tap
} from 'rxjs/operators';
import {
  Observable,
  of
} from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  subs = new SubscriptionsContainer;
  products$: Observable<RootObject[]> = new Observable;
  cart: CartElement[] = [];
  constructor(public shop: ShopService, public auth: AuthService, private router: Router, public user: UserService, private toastr: ToastrService, private spinner: SpinnerService) {

    this.subs.add = this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  ngOnInit(): void {
    this.getProducts();
    this.spinner.startLoading();
  }


  getProducts = () => {
    this.products$ = this.shop.getproducts().pipe(
      catchError(err => {
        console.log(err);
        return of([]);
      }),
      delay(200),
    finalize(() => {this.spinner.finishLoading()})
    );
  }


  ngOnDestroy(): void {
    this.subs.dispose();
  }



}
