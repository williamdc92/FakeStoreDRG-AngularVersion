import { CartElement } from '../../../../providers/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'single-cart-element',
  templateUrl: './single-cart-element.component.html',
  styleUrls: ['./single-cart-element.component.css']
})
export class SingleCartElementComponent implements OnInit {

  @Input() cartproduct: CartElement | undefined
  @Output() isDecreasing = new EventEmitter<string>();
  @Output() isIncreasing = new EventEmitter<string>();
  @Output() isRemoving = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onIncrease = () => {
  this.isIncreasing.emit(this.cartproduct?.product.id);
  }

  onDecrease = () => {
  this.isDecreasing.emit(this.cartproduct?.product.id);
  }

  onRemoving = () => {
  this.isRemoving.emit(this.cartproduct?.product.id);
  }

}
