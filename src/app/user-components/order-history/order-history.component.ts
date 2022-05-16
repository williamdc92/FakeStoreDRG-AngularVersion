import { SubscriptionsContainer } from './../../subscription-container';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { orders, UserService } from 'src/app/providers/user.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {



  orders : orders [] = [];
  orders$ : Observable<orders[]> = new Observable; 

  constructor( public user: UserService, public auth:AuthService) { }

  ngOnInit(): void {
    this.orders$ = this.user.getOrders(this.auth.analyzeToken!.user_id).pipe(
      catchError(err => {
        console.log(err);
        return of([]);
      })
    )
  }

  ngOnDestroy(): void {

  }

}
