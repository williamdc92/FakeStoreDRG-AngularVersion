import { AppState } from './../../store/app.state';
import { selectAllProducts } from './../../store/products/products.selector';
import { loadProducts } from './../../store/products/products.actions';
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
  take,
  tap
} from 'rxjs/operators';
import {
  Observable,
  of
} from 'rxjs';

import { 
  Store 
} from '@ngrx/store';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public allProducts$:  Observable<RootObject[]> = new Observable;
  
  constructor(
    public shop: ShopService,
    public auth: AuthService, 
    private router: Router,
    public user: UserService, 
    private toastr: ToastrService, 
    private spinner: SpinnerService,
    private store: Store<AppState>) {

    this.router.events.pipe(
      tap((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      }),
      take(1)
    ).subscribe();
  }
  

  async ngOnInit() {
    this.allProducts$ = this.getData();
    
  }


  getData() : Observable<RootObject []> {
    return this.store.select(selectAllProducts).pipe(
      tap(result => {
        if (result.length == 0) {
          console.log("popolate store on 0 lenght")
          this.store.dispatch(loadProducts());
        }
      })
    );
  }



}
