import {
  Component,
  OnInit
} from '@angular/core';

//import { RootObject, ShopService } from '../admins/admins-component/src/app/providers/shop.service';
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import {
  Store
} from '@ngrx/store';
import {
  Observable} from 'rxjs';
import {
  RootObject,
  ShopService
} from 'src/app/providers/shop.service';
import {
  AppState
} from 'src/app/store/app.state';
import {
  manageDb
} from 'src/app/store/products/products.actions';
import {
  selectAllProducts
} from 'src/app/store/products/products.selector';

@Component({
  selector: 'app-edit-db',
  templateUrl: './edit-db.component.html',
  styleUrls: ['./edit-db.component.css']
})
export class EditDbComponent implements OnInit {
  AddForm: FormGroup;
  products: RootObject[] = [];
  products$: Observable < RootObject[] > = new Observable;
  sendRequest$: Observable < RootObject[] > = new Observable;
  isAdding: boolean = true;
  isRemoving: boolean = false;

  constructor(
    public shop: ShopService,
    public formBuilder: FormBuilder,
    private store: Store < AppState > ,
  ) {
    this.AddForm = this.formBuilder.group({
      title: [, [Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', [Validators.required, Validators.minLength(2)]],
      producer: ['', [Validators.required, Validators.minLength(2)]],
      image: ['', [Validators.required, Validators.minLength(10)]],
    })
  }

  ngOnInit(): void {
    this.products$ = this.getProducts();
  }

  getProducts(): Observable < RootObject[] > {
    return this.store.select(selectAllProducts);
  }

  addProduct = () => {
    this.store.dispatch(manageDb({
      request$: this.shop.addProduct(this.AddForm.value)
    }))
  }

  removeProduct = (idp: string) => {
    this.store.dispatch(manageDb({
      request$: this.shop.deleteProductById(idp)
    }))

  }






}
