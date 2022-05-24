import { Component, OnInit, OnDestroy } from '@angular/core';
import { orders, UserService } from 'src/app/core/providers/user.service';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/core/providers/auth.service';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { clearOrders, getUserOrders } from 'src/app/store/currentUser/currentuser.action';
import { UserOrders } from 'src/app/store/currentUser/currentuser.selector';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {


  orders$ : Observable<orders[] | undefined> = new Observable; 

  constructor( 
    public user: UserService, 
    public auth:AuthService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.orders$ = this.getData();
  }


  getData() : Observable<orders [] | undefined>   {
    return  this.store.select(UserOrders)
  }
      
  ngOnDestroy(): void {
 
  }

}