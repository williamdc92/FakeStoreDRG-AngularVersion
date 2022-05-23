import { Injectable } from '@angular/core';
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ProductState, singleProductState } from './products.reducer';



export const selectProducts = (state: AppState) => state.products;
export const selectProduct = (state: AppState) => state.product_detail;


export const selectAllProducts = createSelector(
    selectProducts,
    (state: ProductState) => state.products
  );

  export const selectProductsFiltered = createSelector(
    selectProducts,
    (state: ProductState) => state.filteredProducts
  );

  export const selectProductByID = createSelector(
    selectProduct,
    (state: singleProductState) => state.product_detail
  )

  export const hasLoaded = createSelector(
    selectProducts,
    (state: ProductState) => state.status
  )


 