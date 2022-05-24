import {
  Component,
  OnInit} from '@angular/core';
import {
  Router,
  NavigationEnd
} from '@angular/router';
import {
  AuthService
} from 'src/app/core/providers/auth.service';
import {
  ShopService,
  RootObject} from 'src/app/core/providers/shop.service';
import {
  UserService
} from 'src/app/core/providers/user.service';
import {
  ToastrService
} from 'ngx-toastr';
import {
  take,
  tap
} from 'rxjs/operators';
import {
  Observable} from 'rxjs';

import { 
  Store 
} from '@ngrx/store';
import { SpinnerService } from '../../utils/spinner/spinner.service';
import { AppState } from 'src/app/store/app.state';
import { selectAllProducts } from 'src/app/store/products/products.selector';
import { loadProducts } from 'src/app/store/products/products.actions';





@Component({
  selector: 'app-home',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public allProducts$:  Observable<RootObject[]> = new Observable;
  
  constructor(
    public shop: ShopService,
    public auth: AuthService, 
    private router: Router,
    public user: UserService, 
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
  

  ngOnInit() {
    this.store.dispatch(loadProducts());
    this.allProducts$ = this.getData();
    
  }


  getData() : Observable<RootObject []> {
    return this.store.select(selectAllProducts);
  }

}
