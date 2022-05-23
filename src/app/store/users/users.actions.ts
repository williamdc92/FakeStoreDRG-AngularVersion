import { User } from 'src/app/providers/user.service';
import { createAction, props } from '@ngrx/store';

export const loadUsers =  createAction('[Users Component] Load Users');
export const clearUsers = createAction('[Users Component] Clear Users');

export const successLoadUsers = createAction('[Users Component] Users Loaded', props<{ users: User[] }>());
export const failureLoadUsers = createAction('[Users Component] Users not Loaded', props<{err:string}>());

export const changeAdminStatus = createAction('[Users Component] Change Admin Status', props<{id:string}>());

export const successChangeAdminStatus = createAction('[Users Component] Change Admin Status Success', props<{ users: User[] }>())