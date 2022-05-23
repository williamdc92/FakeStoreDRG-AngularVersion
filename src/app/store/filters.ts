import { SubscriptionsContainer } from 'src/app/subscription-container';
import {
    selectAllProducts,
    selectProductsFiltered
  } from 'src/app/store/products/products.selector';
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
    from,
    iif,
    of ,
    pipe,
    Subject
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
    mergeMap,
    takeUntil
  } from 'rxjs/operators';
  import {
    Store
  } from '@ngrx/store';
  import {
    AppState
  } from './app.state';
  import {
    routerNavigatedAction
  } from '@ngrx/router-store';
  import {
    Params
  } from '@angular/router';
  import {
    getOrderById
  } from './currentUser/currentuser.action';
 
  import {
    ToastrService
  } from 'ngx-toastr';
import { loadFilteredProducts, loadProductById } from './products/products.actions';
  


  export interface Filters {
    lastProductId: string | undefined | null,
      lastOrderId: string | undefined,
      lastLoadFilterProducts_key: string | undefined,
      lastLoadFilterProducts_filter: string | undefined
  }

  
  
@Injectable()
export class FiltersEffect implements OnDestroy {

constructor(
private actions$: Actions,
) {}

public ngDestroyed$ = new Subject();

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
    }), takeUntil(this.ngDestroyed$),
  )
);

ngOnDestroy () {
  this.ngDestroyed$.complete();
}

}