import { SubscriptionsContainer } from '../../core/utils/unsubscriber/subscription-container';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError, map, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/providers/auth.service';
import { ShopService } from 'src/app/core/providers/shop.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
import { Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { logoutUser } from 'src/app/store/currentUser/currentuser.action';
import { selectAllProducts } from 'src/app/store/products/products.selector';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  producers$ : Observable<string[]> = new Observable;
  categories$ : Observable<string[]> = new Observable;





  constructor(
    public shop: ShopService, 
    public auth: AuthService, 
    public toastr: ToastrService, 
    public router: Router,
    private store: Store<AppState>,
    ) { }


  ngOnInit(): void {
    
    this.producers$ = this.getProducers(); 
    this.categories$ = this.getCategories();
    
  }

 getProducers() : Observable<string[]> {
   return this.store.select(selectAllProducts).pipe(
  map(product => product.map(product => product.producer).filter((item, pos, self) => { return self.indexOf(item) == pos; })));
 }


 getCategories()  : Observable<string[]> {
   return this.store.select(selectAllProducts).pipe(
     map(product => product.map(product => product.category).filter((item, pos, self) => { return self.indexOf(item) == pos; }))
   );
 }


  logOut(): void {
    
    this.store.dispatch(logoutUser());
  }

  




}
