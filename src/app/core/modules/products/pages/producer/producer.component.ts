
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  ActivatedRoute, NavigationEnd, Router
} from '@angular/router';

import {
  AuthService
} from 'src/app/core/providers/auth.service';
import {
  ShopService,
  RootObject,
  Valutation
} from 'src/app/core/providers/shop.service';
import {
  CartElement,
  Product,
  UserService
} from 'src/app/core/providers/user.service';
import {
  ToastrService
} from 'ngx-toastr';
import {
  catchError,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
  take,
  tap
} from 'rxjs';
import { State, Store } from '@ngrx/store';
import { selectProductsFiltered } from 'src/app/store/products/products.selector';
import { cleanFilteredProducts } from 'src/app/store/products/products.actions';
import { AppState } from 'src/app/store/app.state';


@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements OnInit, OnDestroy {

  producer: string = "";
  cart: CartElement[] = [];
  public f_products$ : Observable<RootObject[] | undefined> = new Observable;

  constructor(
    public shop: ShopService, 
    public auth: AuthService, 
    private route: ActivatedRoute, 
    public user: UserService, 
    private router: Router,
    private store: Store<AppState>,
    ){

    this.router.events.pipe(
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
    this.f_products$ = this.getData();
  }

  getData() : Observable<RootObject [] | undefined> {
    return this.store.select(selectProductsFiltered);
  }

  ngOnDestroy(): void {
    this.store.dispatch(cleanFilteredProducts());
  }

}
