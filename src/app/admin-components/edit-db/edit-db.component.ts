import { SubscriptionsContainer } from './../../subscription-container';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RootObject, ShopService } from 'src/app/providers/shop.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-edit-db',
  templateUrl: './edit-db.component.html',
  styleUrls: ['./edit-db.component.css']
})
export class EditDbComponent implements OnInit {
  AddForm: FormGroup;
  products: RootObject[] = [];
  products$:Observable<RootObject[]> = new Observable;
  sendRequest$ : Observable<RootObject[]> = new Observable;
  isAdding: boolean = true;
  isRemoving: boolean = false;

  constructor( public shop: ShopService, public formBuilder: FormBuilder, private toastr: ToastrService) { 
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

  getProducts() : Observable<RootObject[]> {
    return this.shop.getproducts().pipe(
      catchError((err) => {
        console.log(err);
        return of ([]);
      }),
      take(1)) //take1 necessario?
  }

  addProduct = () => {
    this.sendRequest(this.shop.addProduct(this.AddForm.value)).subscribe();
   }
 
   removeProduct = (idp: string) => {
   this.sendRequest(this.shop.deleteProductById(idp)).subscribe();
   }
 
  sendRequest (request$ : Observable<RootObject>) : Observable<RootObject[]> {
    return request$.pipe(
      tap ( () => {
        this.toastr.success('Done', 'Success', {
          positionClass:"toast-bottom-left"
        });
        this.shop.dbChange = true;
      }),
      catchError ( () => {
        this.toastr.error('Operation failed...', 'Error', {
          positionClass:"toast-bottom-left"
        });
        return of ([]);
      }),
      switchMap(() => {
        return this.getProducts();
      }),
      take(1)
    )
  }




}
