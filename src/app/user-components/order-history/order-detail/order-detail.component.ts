import { SubscriptionsContainer } from './../../../subscription-container';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';
import { orders, UserService } from 'src/app/providers/user.service';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { clearOrders, getUserOrders } from 'src/app/store/currentUser/currentuser.action';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { OrderById } from 'src/app/store/currentUser/currentuser.selector';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  id:string = "";
  tot:number = 0;
  order$ : Observable<orders| undefined> = new Observable;

  constructor( 
    private route: ActivatedRoute, 
    public user:UserService, 
    public auth:AuthService,
    private store: Store < AppState > 
    ) 
    { 
  }
  

  ngOnInit(): void {
    this.store.dispatch(getUserOrders());
    this.order$ = this.store.select(OrderById)
  }


  ngOnDestroy(): void {
  this.store.dispatch(clearOrders());
  }

}
