import { CartElement, orders } from '../../providers/user.service';
import { createAction, props } from '@ngrx/store';
import { SuccessfulLogin } from 'src/app/providers/auth.service';
import { Observable } from 'rxjs';
import { Valutation } from 'src/app/providers/shop.service';

export const loginUser =  createAction('[Current User Component] Load User', props<{validationForm:any}>());
export const registerUser = createAction('[Current User Component] Register User', props<{validationForm:any}>());
export const failureRegisterUser = createAction('[Current User Component] Register User Failure', props<{err:string}>());

export const successLoginUser = createAction('[Current User Component] Success User Loaded', props<{ currentuser: SuccessfulLogin }>());
export const failureLoginUser = createAction('[Current User Component] User not Loaded', props<{err:string}>());

export const logoutUser = createAction('[Current User Component] Logout User');
export const clearUser = createAction('[Current User Component] Clear User section')

export const getUserCart = createAction('[Current User Component] Get User Cart');
export const clearCart = createAction('[Current User Component] Clearing User Cart');

export const successGetUserCart = createAction('[Current User Component] Success Get User Cart', props<{cart: CartElement[]}>());
export const failureGetUserCart = createAction('[Current User Component] Failure Get User Cart', props<{err:string}>());

export const getUserOrders = createAction('[Current User Component] Getting User Orders');
export const clearOrders = createAction('[Current User Component] Clearing User Orders');

export const getOrderById = createAction('[Current User Component] Get Order by ID', props<{id: string}>());
export const clearOrderById = createAction('[Current User Component] Clear Order by ID');

export const successGetUserOrders = createAction('[Current User Component] Success Get User Orders', props<{orders: orders []}>());
export const failureGetUserOrders = createAction('[Current User Component] Failure Get User Orders', props<{err:string}>())

export const manageUserCart = createAction('[Current User Component] Operation on Card', props<{request$ : Observable<CartElement>, successMsg: string, errorMsg: string}>());
export const failureManageUserCart = createAction('[Current User Component] Failure Add Product In Cart',  props<{err:string}>());

export const addUserOrder = createAction('[Current User Component] Placing User Order');
export const failureAddUserOrder = createAction('[Current User Component] Failure Add User Order',  props<{err:string}>());

export const addValutation = createAction('[Current User Component] Add Valutation', props<{valutation : Valutation}>());
export const failureAddValutation = createAction('[Current User Component] Failure Add Valutation', props<{err:string}>());
