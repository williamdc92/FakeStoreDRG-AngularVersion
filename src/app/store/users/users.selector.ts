import { UsersState } from './users.reducer';
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';


export const selectUsers = (state: AppState) => state.users;

export const getUsers = createSelector(
    selectUsers,
    (state: UsersState) => state.users
)


export const getUsersState = createSelector(
    selectUsers,
    (state: UsersState) => state.status
)