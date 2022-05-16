import { SubscriptionsContainer } from './../../../subscription-container';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';
import { orders, UserService } from 'src/app/providers/user.service';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  id:string = "";
  tot:number = 0;
  order$ : Observable<orders> = new Observable;

  constructor( private route: ActivatedRoute, public user:UserService, public auth:AuthService) { 
    route.params.pipe(
      tap((params) => {
        this.id = params['id'];
      }),
      switchMap(() => {
        return this.getOrder();
      }),
      take(1)
    ).subscribe();
  }
  

 

  getOrder() : Observable<orders> {
    return this.order$ = this.user.getOrderById(this.auth.analyzeToken!.user_id,this.id).pipe(
      catchError((err) => {
        console.log(err);
        return of();
      })
    )
  }

  

  ngOnInit(): void {
  }


  ngOnDestroy(): void {

  }

}
