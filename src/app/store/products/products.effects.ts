import {
  selectAllProducts,
  selectProductsFiltered
} from 'src/app/store/products/products.selector';
import {
  ShopService
} from 'src/app/providers/shop.service';
import {
  Injectable
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
  from,
  iif,
  of ,
  pipe
} from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  tap,
  take,
  withLatestFrom,
  filter,
  skipWhile,
  retry,
  takeWhile,
  auditTime,
  mergeMap
} from 'rxjs/operators';
import {
  Store
} from '@ngrx/store';
import {
  AppState
} from '../app.state';
import {
  routerNavigatedAction
} from '@ngrx/router-store';
import {
  Params
} from '@angular/router';
import {
  getOrderById
} from '../currentUser/currentuser.action';
import {
  hasLoaded
} from './products.selector';
import {
  ToastrService
} from 'ngx-toastr';


export interface Filters {
  lastProductId: string | undefined | null,
    lastOrderId: string | undefined,
    lastLoadFilterProducts_key: string | undefined,
    lastLoadFilterProducts_filter: string | undefined
}

@Injectable()
export class ProductsEffect {

  constructor(
    private actions$: Actions,
    private store: Store < AppState > ,
    private shop: ShopService,
    private toastr: ToastrService,
  ) {

    this.store.select(hasLoaded).pipe(tap((value) => {
      if (value == "success") {
        console.log("loaded!")
        this.hasLoaded = true;
      }

    })).subscribe();



  }



  url: Params | undefined;

  hasLoaded: boolean = false;

  allFilters: Filters = {
    lastProductId: undefined,
    lastOrderId: undefined,
    lastLoadFilterProducts_key: undefined,
    lastLoadFilterProducts_filter: undefined
  }




  filters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter((action) => Object.keys(action.payload.routerState.root.children[0].params).length != 0),
      map((action) => {

        const currentFilters: Filters = {
          lastProductId: undefined,
          lastOrderId: undefined,
          lastLoadFilterProducts_key: undefined,
          lastLoadFilterProducts_filter: undefined
        }

        const url = action.payload.routerState.root.children[0].params;
        if (url['id']) {
          currentFilters.lastProductId = url['id'];
          this.allFilters = currentFilters
          return loadProductById({
            id: url['id']
          })
        }
        if ((url['ido'])) {
          currentFilters.lastOrderId = url['ido']
          this.allFilters = currentFilters
          return getOrderById()
        }

        if ((url['producer'])) {
          currentFilters.lastLoadFilterProducts_key = "producer"
          currentFilters.lastLoadFilterProducts_filter = url['producer'];
          this.allFilters = currentFilters
          return loadFilteredProducts()
        } else {
          currentFilters.lastLoadFilterProducts_key = "category"
          currentFilters.lastLoadFilterProducts_filter = url['category'];
          this.allFilters = currentFilters
          return loadFilteredProducts()
        }
      }),
      tap(() => {
        console.log(this.allFilters)
      })
    )
  );



  loadFilteredProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFilteredProducts),
      switchMap(() => this.store.select(selectAllProducts).pipe(
        skipWhile(data => data.length == 0),
        map(() => {
          if (this.allFilters.lastLoadFilterProducts_key == "producer" || this.allFilters.lastLoadFilterProducts_key == "category") {
            return refillLoadFilteredProduct({
              key: this.allFilters.lastLoadFilterProducts_key,
              filter: this.allFilters.lastLoadFilterProducts_filter!
            })
          } else {
            return failureLoadFilteredProducts()
          }
        })

      ))
    )
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


}
