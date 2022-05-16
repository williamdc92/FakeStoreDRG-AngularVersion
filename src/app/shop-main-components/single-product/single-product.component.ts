import { RootObject, Valutation } from './../../providers/shop.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';


@Component({
  selector: 'single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  @Input() product: RootObject | undefined;
  @Input() isInCart : boolean | null = false;
  @Output() isAddingIncart = new EventEmitter<string>();
  @Output() isRemovingFromcart = new EventEmitter<string>();

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  currentValutation = (valutation: Valutation[]) => {

    let sumValutation = valutation.map(valutation => valutation.star).reduce((sum, valutation) => (sum + valutation), 0) / valutation.length;

    sumValutation = Math.round(sumValutation);


    return new Array(sumValutation)
  }

  onAddinCart (id:string) {
    this.isAddingIncart.emit(id);
  }

  onRemoveFromCart (id:string) {
    this.isRemovingFromcart.emit(id);
  }

}
