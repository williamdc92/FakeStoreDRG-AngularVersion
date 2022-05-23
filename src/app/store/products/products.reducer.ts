

import { createReducer, on } from '@ngrx/store';
import { RootObject } from 'src/app/providers/shop.service';
import { loadProducts, loadProductById, successLoadProduct, successLoadSingleProduct, failureLoadProducts, failureLoadSingleProduct, clearProduct, cleanFilteredProducts, loadFilteredProducts, refillLoadFilteredProduct, failureLoadFilteredProducts } from './products.actions';

export interface ProductState {
    products : RootObject[];
    filteredProducts : RootObject[] | undefined;
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
    hasLoaded: boolean
  }

  export interface singleProductState {
    product_detail : RootObject | undefined;
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
  }




export const initialState : ProductState = {
    products: [],
    filteredProducts : undefined,
    error: null,
    status: 'pending',
    hasLoaded  : false,
}

export const initialStateProduct : singleProductState = {
    product_detail : undefined,
    error: null,
    status: 'pending',
}


export const productsReducer = createReducer(

initialState,

on(loadProducts, (state) => ({ ...state, status: 'loading' })),


on(refillLoadFilteredProduct, (state, {key,filter, products}) => ({
    ...state, 
    
    filteredProducts: state.products.filter(item => {
      if (key == "producer") return item.producer == filter
      if (key == "category") return item.category == filter
      return
    }),
  })),

on(cleanFilteredProducts, (state) => ({
  ...state,
  filteredProducts: undefined
})),






//Success

on(successLoadProduct, (state, { products }) => ({
    ...state,
    products: products,
    error: null,
    status: 'success',
    hasLoaded : true
  })),



//Failure

on(failureLoadProducts || failureLoadFilteredProducts, (state, {err}) => ({
    ...state,
    error: err,
    status: 'error',
    hasLoaded : false
})),



)


//SingleProduct

export const singleProductReducer= createReducer(
  initialStateProduct,

  on(loadProductById, (state) => ({ ...state, status: 'loading'})),
  on(successLoadSingleProduct, (state, { product_detail }) => ({
    ...state,
    product_detail: product_detail,
    error: null,
    status: 'success',
  })),
  on(failureLoadSingleProduct, (state, {err}) => ({
    ...state,
    error: err,
    status: 'error'

})),
on(clearProduct, (state) => ({
  ...state,
  product_detail: undefined,
  error: null,
  status: 'pending',
})),


)






