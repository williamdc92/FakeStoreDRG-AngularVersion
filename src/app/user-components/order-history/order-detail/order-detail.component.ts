import { SubscriptionsContainer } from './../../../subscription-container';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';
import { orders, UserService } from 'src/app/providers/user.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  order: orders | undefined ;
  id:string = "";
  tot:number = 0;

  subs = new SubscriptionsContainer;

  constructor( private route: ActivatedRoute, public user:UserService, public auth:AuthService) { 
    this.subs.add = route.params.subscribe(params => {
      this.id = params['id'];
      this.getOrder();
      
    });
  }
  


  ngOnInit(): void {
  }


  getOrder = () => {
    this.subs.add = this.user.getOrderById(this.auth.analyzeToken!.user_id,this.id).subscribe({
      next: (order) => {
        this.order= order;
      },
      error: (error) => {console.log(error);}
    })
  }

  ngOnDestroy(): void {
      this.subs.dispose();
  }

}
