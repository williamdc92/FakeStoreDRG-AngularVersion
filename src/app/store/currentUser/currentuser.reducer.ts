import { clearUser, failureLoginUser, loginUser, logoutUser, successLoginUser, failureRegisterUser, successGetUserCart, failureGetUserCart, successGetUserOrders, failureGetUserOrders, failureManageUserCart, failureAddUserOrder, clearCart, clearOrders, getOrderById, successGetOrderById, failureGetOrderById } from './currentuser.action';
import { RefreshToken } from '../../providers/auth.service';
import { createReducer, on } from '@ngrx/store';
import { CartElement, orders, User } from 'src/app/providers/user.service';

export interface CurrentUserState {
    currentUser: string | undefined;
    isAdmin: boolean | undefined;
    token: string | undefined;
    refreshToken: string | undefined;
    cart : CartElement[] | undefined;
    orders : orders [] | undefined;
    currentOrder : orders | undefined;
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
    hasLoaded: boolean;
}


export const initialState : CurrentUserState = {
    currentUser: undefined,
    cart : undefined,
    orders : undefined,
    currentOrder : undefined,
    isAdmin : undefined,
    token : undefined,
    refreshToken : undefined,
    error: null,
    status: 'pending',
    hasLoaded: false
}

export const currentuserReducer = createReducer(
    initialState,
    on(loginUser, (state) => ({ ...state, status: 'loading' })),

    on(successLoginUser, (state, { currentuser }) => ({
        ...state,
        currentUser: currentuser.email,
        isAdmin : currentuser.isAdmin,
        token: currentuser.token,
        refreshToken : currentuser.refreshToken,
        error: null,
        status: 'success',
      })),

    on (logoutUser || clearUser, (state) => ({
        ...state,
        currentUser: undefined,
        orders : undefined,
        currentOrder : undefined,
        cart : undefined,
        isAdmin : undefined,
        token : undefined,
        refreshToken : undefined,
        error: null,
        status: 'pending',
    })),

    on (successGetUserCart, (state, {cart}) => ({
        ...state,
        cart: cart

    })),

    on (clearCart, (state) => ({
        ...state,
        cart : []
    })),

    on (clearOrders, (state) => ({
        ...state,
        orders : []
    })),

    on (successGetUserOrders, (state, {orders}) => ({
        ...state,
        orders: orders

    })),

    on (successGetOrderById, (state, {id}) => ({
        ...state,
        currentOrder : state.orders?.find(order => order.id === id )
    })),
    

    //Failures

    on(failureLoginUser || failureRegisterUser || failureGetUserCart || failureGetUserOrders || failureManageUserCart || failureAddUserOrder || failureGetOrderById, (state, {err}) => ({
        ...state,
        error: err,
        status: 'error'
    })),

)