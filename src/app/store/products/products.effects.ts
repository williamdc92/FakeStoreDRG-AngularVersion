import {
  selectAllProducts} from 'src/app/store/products/products.selector';
import {
  ShopService
} from 'src/app/providers/shop.service';
import {
  Injectable, OnDestroy
} from '@angular/core';
import {
  Actions,
  createEffect,
  ofType
} from '@ngrx/effects';
import {
  loadProducts,
  loadProductById,
  successLoadProduct,
  failureLoadProducts,
  failureLoadSingleProduct,
  successLoadSingleProduct,
  loadFilteredProducts,
  manageDb,
  refillLoadFilteredProduct,
  failureLoadFilteredProducts,
} from './products.actions';

import {
  of, Subject} from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  tap,
  take,
  skipWhile,
  takeUntil} from 'rxjs/operators';
import {
  Store
} from '@ngrx/store';
import {
  AppState
} from '../app.state';
import {
  Params
} from '@angular/router';
import {
  ToastrService
} from 'ngx-toastr';
import { FiltersEffect } from '../filters';


export interface Filters {
  lastProductId: string | undefined | null,
    lastOrderId: string | undefined,
    lastLoadFilterProducts_key: string | undefined,
    lastLoadFilterProducts_filter: string | undefined
}

@Injectable()
export class ProductsEffect implements OnDestroy {

  constructor(
    private actions$: Actions,
    private store: Store < AppState > ,
    private shop: ShopService,
    private toastr: ToastrService,
    private filters: FiltersEffect
  ) {}

  public ngDestroyed$ = new Subject();

  url: Params | undefined;

  loadFilteredProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFilteredProducts),
      switchMap(() => this.store.select(selectAllProducts).pipe(
        skipWhile(data => data.length == 0),
        map(() => {
          if (this.filters.allFilters.lastLoadFilterProducts_key == "producer" || this.filters.allFilters.lastLoadFilterProducts_key == "category") {
            return refillLoadFilteredProduct({
              key: this.filters.allFilters.lastLoadFilterProducts_key!,
              filter: this.filters.allFilters.lastLoadFilterProducts_filter!
            })
          } else {
            return failureLoadFilteredProducts()
          }
        }), takeUntil(this.ngDestroyed$),
      ))
    ) //chiusura?
  );


  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        (this.shop.getproducts()).pipe(
          map((products) =>
            successLoadProduct({
              products: products
            })),
          catchError((err) =>
            of (failureLoadProducts({
              err
            }))),
          take(1)
        )
      )
    )
  );




  manageDb$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manageDb),
      switchMap((props) =>
        (props.request$).pipe(
          tap((props) => {
            this.toastr.success(`Operation Done`, 'Success', {
              positionClass: "toast-bottom-left"
            });
          }),
          map(() =>
            loadProducts()
          ),
          catchError((err) => {
            this.toastr.warning(`Operation Failed}`, 'Error', {
              positionClass: "toast-bottom-left"
            });
            return of(failureLoadProducts({
              err
            }));
          }),
          take(1)
        )
      )
    )
  );



  // SINGLE PRODUCT

  loadProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductById),
      switchMap((action) =>
        (this.shop.getProductById(action.id!)).pipe(
          map((product_detail) =>
            successLoadSingleProduct({
              product_detail: product_detail
            })),
          catchError((err) =>
            of (failureLoadSingleProduct({
              err
            }))),
          take(1)
        )
      )
    )
  );

  ngOnDestroy() {
    this.ngDestroyed$.complete();
    }


}
