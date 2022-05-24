import { RootObject } from 'src/app/core/providers/shop.service';
import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';

export const loadProducts =  createAction('[Product Component] Load Products');

export const loadFilteredProducts = createAction('[Product Component] Load filtered');

export const cleanFilteredProducts = createAction('[Product Component] Clean filtered Products');

export const successLoadProduct = createAction('[Product Component] Products Loaded', props<{ products: RootObject[] }>());
export const failureLoadProducts = createAction('[Product Component] Products non Loaded', props<{err:string}>());

export const refillLoadFilteredProduct = createAction('[Product Component] Filtered products refilled', props<{key: string,filter: string, products?:RootObject[]}>());
export const failureLoadFilteredProducts = createAction('[Product Component] Products non Loaded');


export const loadProductById = createAction('[Product Component] Load Single Product by id', props<{id: string | null | undefined}>());
export const clearProduct = createAction('[Product Component] Clear Single Product section');
export const successLoadSingleProduct = createAction('[Product Component] Product Loaded', props<{ product_detail: RootObject}>());
export const failureLoadSingleProduct = createAction('[Product Component] Products non Loaded', props<{err:string}>());

export const manageDb = createAction ('[Product Component] Database Management Action',  props<{request$ : Observable<RootObject>}>() )