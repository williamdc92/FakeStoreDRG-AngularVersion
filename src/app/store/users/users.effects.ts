import {
  UserService
} from 'src/app/providers/user.service';
import {
  Injectable
} from '@angular/core';
import {
  Actions,
  createEffect,
  ofType
} from '@ngrx/effects';
import {
  changeAdminStatus,
  failureLoadUsers,
  loadUsers,
  successLoadUsers
} from './users.actions';

import {
  from,
  of
} from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  tap,
  take
} from 'rxjs/operators';
import {
  Store
} from '@ngrx/store';
import {
  AppState
} from '../app.state';
import {
  ToastrService
} from 'ngx-toastr';

@Injectable()
export class UsersEffect {
  constructor(
    private actions$: Actions,
    private store: Store < AppState > ,
    private users: UserService,
    private toastr: ToastrService,
  ) {}



  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      tap((action) =>
        console.log("action richiamata: " + action.type)),
      switchMap(() =>
        (this.users.getUsers()).pipe(
          map((users) =>
            successLoadUsers({
              users: users
            })),
          catchError((err) =>
            of (failureLoadUsers({
              err
            }))),
          take(1)
        )
      )
    )
  );


  changeAdminStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeAdminStatus),
      switchMap((props) =>
        (this.users.changeAdminStatus(props.id, localStorage.getItem('token')).pipe(
          tap(() => {
            this.toastr.success('Admin status changed successfully', 'Success', {
              positionClass: "toast-bottom-left"
            });
          }),
          map(() =>
            loadUsers()),
          catchError((err) => {
            this.toastr.error('Cannot change admin status, please try again', 'Error', {
              positionClass: "toast-bottom-left"
            });
            return of(failureLoadUsers({
              err
            }))
          }),
          take(1)
        ))
      )
    )
  );

}
