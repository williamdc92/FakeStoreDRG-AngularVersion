import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { orders } from 'src/app/providers/user.service';

@Component({
  selector: 'single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent implements OnInit {

  @Input() singleOrder : orders | undefined ;

  constructor() { }

  ngOnInit(): void {
    console.log(this.singleOrder);
  }

}
