  import {
    Injectable, OnDestroy
  } from '@angular/core';
  import {
    Actions,
    createEffect,
    ofType
  } from '@ngrx/effects';

  
  import {
    Subject
  } from 'rxjs';
  import {
    map,
    tap,
    filter,
    takeUntil
  } from 'rxjs/operators';
  import {
    routerNavigatedAction
  } from '@ngrx/router-store';
  import {
    getOrderById
  } from './currentUser/currentuser.action';
 
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
    // tap((action => {
    //   const state = action.payload.routerState
    //   const root = state.root
    //   const child = root.firstChild?.firstChild
    //   const key = child?.params
    // })),
    filter((action) => action.payload.routerState.root.firstChild?.firstChild !== undefined),
    map((action) => {

      const currentFilters: Filters = {
        lastProductId: undefined, //single Product Details By id
        lastOrderId: undefined, //single Order Details By id
        lastLoadFilterProducts_key: undefined, //producer || category
        lastLoadFilterProducts_filter: undefined //name of the producer || name of the categy
      }

      const url = action.payload.routerState.root.firstChild?.firstChild?.params!
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
    }), takeUntil(this.ngDestroyed$),
  )
);

ngOnDestroy () {
  this.ngDestroyed$.complete();
}

}