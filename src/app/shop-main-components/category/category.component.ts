import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  ActivatedRoute, NavigationEnd, Params, Router
} from '@angular/router';
import {
  AuthService
} from 'src/app/providers/auth.service';
import {
  ShopService,
  RootObject,
} from 'src/app/providers/shop.service';
import {
  CartElement,
  UserService
} from 'src/app/providers/user.service';
import {
  ToastrService
} from 'ngx-toastr';
import {
  Observable,
  Subscription
} from 'rxjs'
import {
  map,
  switchMap,
  take,
  tap
} from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { selectProductsFiltered } from 'src/app/store/products/products.selector';
import { cleanFilteredProducts } from 'src/app/store/products/products.actions';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  category: string = "";
  public f_products$ : Observable<RootObject[] | void> = new Observable;

  constructor(
    public shop: ShopService, 
    public auth: AuthService, 
    private route: ActivatedRoute, 
    public user: UserService, 
    private toastr: ToastrService, 
    private router: Router, 
    private store: Store<AppState>
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

  getData() : Observable<RootObject [] | undefined>{
    return this.store.select(selectProductsFiltered)
  }

  ngOnDestroy(): void {
    this.store.dispatch(cleanFilteredProducts());
  }

}
