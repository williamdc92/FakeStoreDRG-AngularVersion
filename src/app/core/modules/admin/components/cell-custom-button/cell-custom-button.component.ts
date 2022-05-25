import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShopService } from 'src/app/core/providers/shop.service';
import { AppState } from 'src/app/store/app.state';
import { manageDb } from 'src/app/store/products/products.actions';

@Component({
  selector: 'app-cell-custom-button',
  templateUrl: './cell-custom-button.component.html',
  styleUrls: ['./cell-custom-button.component.css']
})


export class CellCustomButtonComponent implements OnInit {
  data: any;
  params: any;

  constructor(
    private store: Store < AppState >,
    private shop : ShopService
  ) { }

  agInit(params:any) {
    this.params = params;
    this.data = params.value;
  }

  ngOnInit(): void {
  }

  removeProduct = () => {
    console.log(this.params.data.id)
    this.store.dispatch(manageDb({
      request$: this.shop.deleteProductById(this.params.data.id)
    }))
  }

}
