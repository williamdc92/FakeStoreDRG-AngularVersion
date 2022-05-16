import {
  SubscriptionsContainer
} from './../../subscription-container';
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
  Observable,
  of,
  switchMap,
  take,
  tap
} from 'rxjs';


@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements OnInit, OnDestroy {

  producer: string = "";
  products: RootObject[] = [];
  products$: Observable<RootObject[]> = new Observable;
  cart: CartElement[] = [];


  constructor(public shop: ShopService, public auth: AuthService, private route: ActivatedRoute, public user: UserService, private toastr: ToastrService, private router: Router) {

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
        this.producer = params['producer'];
      }),
      switchMap(() => {
        return this.getProducts();
      }),
      take(1)
    ).subscribe();
  }



  ngOnInit(): void {
  }

  getProducts() : Observable<RootObject[]> {
   return this.products$ = this.shop.getProductsOfProducer(this.producer).pipe(
      catchError(err => {
        console.log(err);
        return of([]);
      })
    )
  }

  ngOnDestroy(): void {
 
  }



}
