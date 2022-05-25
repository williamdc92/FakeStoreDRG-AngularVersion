import {
  Component,
  OnInit,
  ViewChild
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
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import {
  Observable} from 'rxjs';
import {
  RootObject,
  ShopService
} from 'src/app/core/providers/shop.service';
import {
  AppState
} from 'src/app/store/app.state';
import {
  manageDb
} from 'src/app/store/products/products.actions';
import {
  selectAllProducts
} from 'src/app/store/products/products.selector';
import { CellCustomButtonComponent } from '../../components/cell-custom-button/cell-custom-button.component';

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

  @ViewChild(AgGridAngular) agGrid! : AgGridAngular

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

  


  onGridReady () {
   }

 
   onCellClicked = (event: CellClickedEvent) => {
  
   }
 
 
   colDefs: ColDef[] = [
    {
      field: "id"
    }
    ,
 
     {
       field: "title",
       sortable: true,
       filter: true,
     },
 
     {
       field: "price",
       sortable: true,
       filter: true,
       cellRenderer: function (params: {value: string;}) {
         return '<span><i class="material-icons" style="font-size:17px">euro</i>' + params.value + '</span>'
       }
     },
 
     {
       field: "category",
       sortable: true,
       filter: true
     },
 
     {
       field: "producer",
       sortable: true,
       filter: true,
     },

     {
       field : "Remove Product",
       cellRendererFramework : CellCustomButtonComponent
     }
   ]
 





}
