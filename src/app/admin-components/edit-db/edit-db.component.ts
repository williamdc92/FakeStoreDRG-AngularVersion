import { SubscriptionsContainer } from './../../subscription-container';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RootObject, ShopService } from 'src/app/providers/shop.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-edit-db',
  templateUrl: './edit-db.component.html',
  styleUrls: ['./edit-db.component.css']
})
export class EditDbComponent implements OnInit, OnDestroy {

  subs = new SubscriptionsContainer();

  AddForm: FormGroup;
  products: RootObject[] = [];
  products$:Observable<RootObject[]> = new Observable;
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
    this.getProducts();
  }

  getProducts = () => {
    this.products$ = this.shop.getproducts().pipe(
      catchError((err) => {
        console.log(err);
        return of ([]);
      }))
  }

  addProduct = () => {

    this.subs.add = this.shop.addProduct(this.AddForm.value).subscribe({
  next: () => {
    this.toastr.success('Product added!', 'Success', {
      positionClass:"toast-bottom-left"
    });
    this.shop.dbChange = true;
    this.getProducts();
    
  },
  error: () => {
    this.toastr.error('Cannot add product!', 'Error', {
      positionClass:"toast-bottom-left"
    });
  }
})
  }

  removeProduct = (idp: string) => {

    this.subs.add = this.shop.deleteProductById(idp).subscribe({
      next: () => {
        this.toastr.warning('Product removed successfully!', 'Success', {
        positionClass:"toast-bottom-left"
      });
      this.shop.dbChange = true;
      this.getProducts();},
      error: () => {
        this.toastr.error('Cannot remove product, please try again later', 'Error', {
          positionClass:"toast-bottom-left"
        });
      }
    })

  }

 ngOnDestroy(): void {
     this.subs.dispose();
 }

}
