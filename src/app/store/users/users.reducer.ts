import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/providers/user.service';
import { clearUsers, failureLoadUsers, loadUsers, successLoadUsers } from './users.actions';


export interface UsersState {
    users: User[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
}


export const initialState : UsersState = {
    users: [],
    error: null,
    status: 'pending',
}

export const usersReducer = createReducer(
    initialState,

    on(loadUsers, (state) => ({ ...state, status: 'loading' })),
    //Success

on(successLoadUsers, (state, { users }) => ({
    ...state,
    users: users,
    error: null,
    status: 'success',
  })),

  on(clearUsers, (state) => ({
      ...state,
      users: []
  })),


  
//Failure

on(failureLoadUsers, (state, {err}) => ({
    ...state,
    error: err,
    status: 'error'
}))
)