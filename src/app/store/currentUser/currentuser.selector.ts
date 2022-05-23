import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CurrentUserState } from './currentuser.reducer';


export const selectUser = (state: AppState) => state.currentUser;

export const UserCart = createSelector(
    selectUser,
    (state: CurrentUserState) => state.cart
)

export const UserOrders = createSelector(
    selectUser,
    (state: CurrentUserState) => state.orders
)

export const OrderById = createSelector(
    selectUser,
    (state: CurrentUserState) => state.currentOrder
)

export const UserState = createSelector(
    selectUser,
    (state: CurrentUserState) => state.status
)

